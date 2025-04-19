const express = require('express');
const { createBullBoard } = require('@bull-board/api');
const { BullAdapter } = require('@bull-board/api/bullAdapter');
const { ExpressAdapter } = require('@bull-board/express');
const fila = require('./fila');
const eventosAPI = require('./eventos');
require('dotenv').config();

const app = express();
app.use(express.json());

// ✅ API para receber eventos externos (auth-service, task-service, etc)
app.use('/api', eventosAPI);

// ✅ Painel BullBoard
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/dashboard');

createBullBoard({
  queues: [new BullAdapter(fila)],
  serverAdapter,
});

app.use('/dashboard', serverAdapter.getRouter());

// 🚀 Inicia o serviço
const PORT = 3004;
app.listen(PORT, () => {
  console.log(`🚀 Event Queue Service rodando na porta ${PORT}`);
  console.log(`📊 BullBoard disponível em: http://localhost:${PORT}/dashboard`);
});
