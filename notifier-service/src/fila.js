const Queue = require('bull');
require('dotenv').config();

const fila = new Queue('eventos', process.env.REDIS_URL);
module.exports = fila;
