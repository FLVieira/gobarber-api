/* eslint-disable import/first */
// "dev:debug": "nodemon --inspect src/server.js"
import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import { resolve } from 'path';
import routes from './routes';

import './database';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(
      '/files',
      express.static(resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.app.use(routes);
  }
}

export default new App().app;
