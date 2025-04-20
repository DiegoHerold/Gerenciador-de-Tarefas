const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  if (req.path.includes('/usuarios/login') || req.path.includes('/usuarios/cadastro')) return next();

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ erro: 'Token não fornecido.' });

  jwt.verify(token, process.env.JWT_SECRET || 'segredo-super-seguro', (err, usuario) => {
    if (err) return res.status(403).json({ erro: 'Token inválido.' });
    req.usuario = usuario;
    next();
  });
};
