const express = require('express');
const fila = require('./fila');
const router = express.Router();
router.post('/evento', async (req, res) => {
  const { tipo, dados } = req.body;
  if (!tipo || !dados) {
    return res.status(400).json({ erro: 'Tipo e dados obrigatórios.' });
  }
  await fila.add(tipo, dados);
  res.status(202).json({ mensagem: 'Evento enfileirado com sucesso.' });
});
module.exports = router;