// src/app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); 

// Rotas da API
const tarefaRoutes = require('./routes/tarefaRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

// Rota de teste da API
app.get('/', (req, res) => {
  res.json({ mensagem: 'API de Tarefas Online' });
});

// Rota de tarefas
app.use('/api/tarefas', tarefaRoutes);

// Rotas de usuários (cadastro, login, logout, etc)
app.use('/api/usuarios', usuarioRoutes);

module.exports = app;

