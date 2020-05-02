import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import userController from './app/controllers/UserController';
import sessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

// User routes
routes.post('/users', userController.store);
routes.get('/users', userController.index);
routes.put('/users', authMiddleware, userController.update);

// Session routes
routes.post('/sessions', sessionController.store);

// File routes
routes.post('/files', upload.single('file'), (req, res) => {
  return res.json({ ok: true });
});

export default routes;
