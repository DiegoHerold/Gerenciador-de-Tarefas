const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3002;
const JWT_SECRET = "chave-secreta-supersegura";

let usuarios = [];
let id = 1;

app.post('/api/auth/cadastro', async (req, res) => {
  const { nome, email, senha } = req.body;
  const hash = await bcrypt.hash(senha, 8);
  const novo = { id: id++, nome, email, senha: hash };
  usuarios.push(novo);
  res.status(201).json({ mensagem: "Usuário cadastrado com sucesso." });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, senha } = req.body;
  const usuario = usuarios.find(u => u.email === email);
  if (!usuario) return res.status(401).json({ erro: "Usuário não encontrado." });

  const valid = await bcrypt.compare(senha, usuario.senha);
  if (!valid) return res.status(401).json({ erro: "Senha inválida." });

  const token = jwt.sign({ id: usuario.id, email: usuario.email }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

app.listen(PORT, () => {
  console.log(`Auth Service rodando na porta ${PORT}`);
});
