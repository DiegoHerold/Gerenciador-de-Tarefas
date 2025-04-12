
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const usuarios = require('./usuarioService');
const autenticarToken = require('./authMiddleware');
const autorizarRole = require('./autorizarRole');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3002;
const SECRET = process.env.JWT_SECRET || 'segredo-super-seguro';

app.use(express.json());

usuarios.iniciarRepositorio();

function gerarToken(usuario) {
  return jwt.sign(
    {
      id: usuario.id || usuario._id,
      email: usuario.email,
      role: usuario.role || 'comum'
    },
    SECRET,
    { expiresIn: '1h' }
  );
}

app.post('/api/usuarios/cadastro', async (req, res) => {
  const { nome, email, senha, role } = req.body;
  const existente = await usuarios.buscarPorEmail(email);
  if (existente) return res.status(400).json({ erro: 'Email já cadastrado.' });

  const hash = await bcrypt.hash(senha, 8);
  const novo = await usuarios.criar({ nome, email, senha: hash, role: role || 'comum' });
  res.status(201).json({ mensagem: "Usuário criado com sucesso.", id: novo.id });
});

app.post('/api/usuarios/login', async (req, res) => {
  const { email, senha } = req.body;
  const usuario = await usuarios.buscarPorEmail(email);
  if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado.' });

  const valido = await bcrypt.compare(senha, usuario.senha);
  if (!valido) return res.status(401).json({ erro: 'Senha inválida.' });

  const token = gerarToken(usuario);
  res.json({ token });
});

app.put('/api/usuarios/atualizar', autenticarToken, async (req, res) => {
  const { id, nome, email, senha } = req.body;
  const dados = {};
  if (nome) dados.nome = nome;
  if (email) dados.email = email;
  if (senha) dados.senha = await bcrypt.hash(senha, 8);

  const atualizado = await usuarios.atualizar(id, dados);
  res.json({ mensagem: 'Dados atualizados com sucesso.', atualizado });
});

app.delete('/api/usuarios/deletar', autenticarToken, autorizarRole(['admin']), async (req, res) => {
  const { id } = req.body;
  await usuarios.deletar(id);
  res.status(204).send();
});

app.get('/api/usuarios/:id', autenticarToken, async (req, res) => {
  const usuario = await usuarios.listarPorId(req.params.id);
  if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado.' });
  res.json({ id: usuario.id || usuario._id, nome: usuario.nome, email: usuario.email, role: usuario.role });
});

app.post('/api/usuarios/logout', autenticarToken, (req, res) => {
  res.json({ mensagem: 'Logout realizado com sucesso (token descartado no cliente).' });
});

app.listen(PORT, () => {
  console.log(`✅ Usuario Service rodando na porta ${PORT}`);
});
