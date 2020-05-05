import Bee from 'bee-queue';

import redisConfig from '../config/redis';
import CancellationMail from '../app/jobs/CancellationMail';

const jobs = [CancellationMail]; // Para cada um dos jobs é criado uma fila.

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    // Inicializando as filas
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  add(queue, job) {
    // Adicionando novos items dentro das filas
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    // Processando items dentro das filas
    jobs.forEach((job) => {
      const { bee, handle } = this.queues[job.key];
      bee.process(handle);
    });
  }
}

export default new Queue();
