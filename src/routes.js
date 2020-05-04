import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import userController from './app/controllers/UserController';
import providerController from './app/controllers/ProviderController';
import appointmentController from './app/controllers/AppointmentController';
import scheduleController from './app/controllers/ScheduleController';
import sessionController from './app/controllers/SessionController';
import fileController from './app/controllers/FileController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

// User routes
routes.post('/users', userController.store);
routes.get('/users', userController.index);
routes.put('/users', authMiddleware, userController.update);

// Provider routes
routes.get('/providers', providerController.index);

// Appointment routes
routes.get('/appointments', authMiddleware, appointmentController.index);
routes.post('/appointments', authMiddleware, appointmentController.store);

// Schedule routes (The appointment index method, for providers.)
routes.get('/schedule', authMiddleware, scheduleController.index);

// Session routes
routes.post('/sessions', sessionController.store);

// File routes
routes.post('/files', upload.single('file'), fileController.store);

export default routes;
