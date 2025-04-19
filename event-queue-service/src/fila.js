const Queue = require('bull');
require('dotenv').config();
const fila = new Queue('eventos', process.env.REDIS_URL, {
  defaultJobOptions: {
    attempts: 5,
    backoff: {
      type: 'exponential',
      delay: 5000
    }
  }
});
module.exports = fila;