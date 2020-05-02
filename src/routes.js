import { Router } from 'express';

import userController from './app/controllers/UserController';
import sessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', userController.store);
routes.get('/users', userController.index);
routes.put('/users', authMiddleware, userController.update);

routes.post('/sessions', sessionController.store);

export default routes;
