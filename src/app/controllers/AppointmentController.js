import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns';
import pt from 'date-fns/locale/pt';

import User from '../models/User';
import File from '../models/File';
import Appointment from '../models/Appointment';
import Notification from '../schemas/Notification';

import Queue from '../../lib/Queue';
import CancellationMail from '../jobs/CancellationMail';

class AppointmentController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const appointments = await Appointment.findAll({
      where: {
        user_id: req.userId,
        canceled_at: null,
      },
      order: ['date'],
      attributes: ['id', 'date'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name'],
          include: [
            { model: File, as: 'avatar', attributes: ['id', 'path', 'url'] },
          ],
        },
      ],
    });
    res.json({ appointments });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const { provider_id, date } = req.body;

    /**
     * Check if provider id is a provider.
     */
    const checkIsProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });

    if (!checkIsProvider) {
      return res
        .status(401)
        .json({ error: 'You can only create appointments with providers' });
    }

    /**
     * Check for that a provider cannot make an appointment with himself.
     */
    if (provider_id === req.userId) {
      return res
        .status(400)
        .json({ error: 'Making an appointment with yourself is not allowed.' });
    }

    /**
     * Check if the date passed is valid for the app.
     * 1st validation: Check if the date is in the past.
     * 2nd validation: Checking the provider date availability.
     */
    const hourStart = startOfHour(parseISO(date)); // parseISO transforma a string de date (passada no imnsonia) em um objeto date do js, para assim o startHour poder funcionar. O startHour seta qualquer que seja a hora/minutos para a hora antecedemente, para que por exemplo impeçamos o usuário de fazer marcações de horário com minutos (19:30|12:30) e sim somente 19:00 ou 12:00.
    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permited.' });
    }

    const checkAvailability = await Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: hourStart,
      },
    });

    if (checkAvailability) {
      return res
        .status(400)
        .json({ error: 'Appointment date is not available' });
    }

    const appointment = await Appointment.create({
      user_id: req.userId,
      provider_id,
      date: hourStart,
    });

    /**
     * Notify appointment provider
     */
    const user = await User.findByPk(req.userId);
    const formattedDate = format(
      hourStart,
      "'dia' dd 'de' MMMM', às' H:mm'h'",
      { locale: pt }
    );
    await Notification.create({
      content: `Novo agendamento de ${user.name} para ${formattedDate}`,
      user: provider_id,
    });

    return res.json(appointment);
  }

  async delete(req, res) {
    const appointment = await Appointment.findByPk(req.params.id);

    if (appointment.user_id !== req.userId) {
      return res.status(400).json({
        error: "You don't have permission to cancel this appointment.",
      });
    }

    /**
     * The cut-off time for canceling an appointment is 2 hours before itself.
     * Check if the canceling is at least 2 hours from the date of the appointment.
     */
    const dateWithSub = subHours(appointment.date, 2); // Appointment date - 2hr.
    if (isBefore(dateWithSub, new Date())) {
      // The dateWithSub "is before" the present date?
      res.status(401).json({
        error: 'You can only cancel appointments 2 hours is advance.',
      });
    }

    appointment.canceled_at = new Date();

    await appointment.save();

    /**
     * Sending an notice email to the provider.
     */
    const provider = await User.findByPk(appointment.provider_id, {
      attributes: ['name', 'email'],
    });
    const customer = await User.findByPk(appointment.user_id, {
      attributes: ['name'],
    });
    Queue.add(CancellationMail.key, {
      provider,
      customer,
      appointment,
    });

    return res.json(appointment);
  }
}

export default new AppointmentController();
