// index.js
require('dotenv').config(); // Carrega variáveis do .env
const app = require('./src/app');
const http = require('http');

const PORT = process.env.PORT || 3000;

// Cria servidor HTTP com Express
const server = http.createServer(app);

// Inicia o servidor
server.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

// Trata erros inesperados
process.on('uncaughtException', (err) => {
  console.error('Erro não tratado:', err);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.error('Promise rejeitada sem catch:', err);
  process.exit(1);
});
