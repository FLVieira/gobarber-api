import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore } from 'date-fns';
import User from '../models/User';

import Appointment from '../models/Appointment';

class AppointmentController {
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
    const isProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });

    if (!isProvider) {
      return res
        .status(401)
        .json({ error: 'You can only create appointments with providers' });
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

    return res.json(appointment);
  }
}

export default new AppointmentController();
