import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import userController from './app/controllers/UserController';
import providerController from './app/controllers/ProviderController';
import appointmentController from './app/controllers/AppointmentController';
import sessionController from './app/controllers/SessionController';
import scheduleController from './app/controllers/ScheduleController';
import notificationController from './app/controllers/NotificationController';
import availableController from './app/controllers/AvailableController';
import fileController from './app/controllers/FileController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

// Welcome Route
routes.get('/', (req, res) => {
  res.json('Bem vindo a API.');
});

// User routes
routes.post('/users', userController.store);
routes.get('/users', userController.index);
routes.put('/users', authMiddleware, userController.update);

// Session routes
routes.post('/sessions', sessionController.store);

// Routes that require authentication -----

routes.use(authMiddleware);

// Provider routes
routes.get('/providers', providerController.index);
routes.get('/providers/:providerId/available', availableController.index);

// Appointment routes
routes.get('/appointments', appointmentController.index);
routes.post('/appointments', appointmentController.store);
routes.delete('/appointments/:id', appointmentController.delete);

// Schedule routes (The appointment index method, for providers.)
routes.get('/schedule', scheduleController.index);

// Notification routes
routes.get('/notifications', notificationController.index);
routes.put('/notifications/:id', notificationController.update);

// File routes
routes.post('/files', upload.single('file'), fileController.store);

export default routes;
