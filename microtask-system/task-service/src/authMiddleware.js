// src/authMiddleware.js
const jwt = require('jsonwebtoken');
const SECRET = "chave-secreta-supersegura"; // mesma usada no auth-service

function autenticarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ erro: 'Token não fornecido' });
  }

  jwt.verify(token, SECRET, (err, usuario) => {
    if (err) return res.status(403).json({ erro: 'Token inválido' });
    req.usuario = usuario; // adiciona usuário no req para usar nas rotas
    next();
  });
}

module.exports = autenticarToken;
