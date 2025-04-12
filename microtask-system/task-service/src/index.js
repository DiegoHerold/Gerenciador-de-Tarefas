const express = require('express');
const autenticarToken = require('./authMiddleware');

const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());

app.get('/api/tarefas', autenticarToken, (req, res) => {
  // acesso autorizado
  res.json([{ id: 1, titulo: 'Tarefa protegida', usuario_id: req.usuario.id }]);
});

// app.get('/tarefas', (req, res) => {
//   res.json([{ id: 1, titulo: 'Primeira tarefa' }]);
// });

app.listen(PORT, () => {
  console.log(`Task Service rodando na porta ${PORT}`);
});
