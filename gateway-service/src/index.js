const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const autenticarToken = require('./auth');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3006;
app.get('/', (req, res) => {
  res.send('🚪 Gateway está no ar! Tudo certo por aqui.');
});


// Rotas públicas sem autenticação
app.use('/api/usuarios/login', createProxyMiddleware({ target: process.env.AUTH_URL, changeOrigin: true }));
app.use('/api/usuarios/cadastro', createProxyMiddleware({ target: process.env.AUTH_URL, changeOrigin: true }));
// Middleware global para rotas protegidas
app.use('/api', autenticarToken);
// Proxy para usuários
app.use('/api/usuarios', createProxyMiddleware({ target: process.env.AUTH_URL, changeOrigin: true }));

// Proxy para tarefas
app.use('/api/tarefas', createProxyMiddleware({ target: process.env.TASK_URL, changeOrigin: true }));

app.listen(PORT, () => {
  console.log(`🚪 API Gateway rodando na porta ${PORT}`);
});
