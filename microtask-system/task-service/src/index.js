const express = require('express');
const autenticarToken = require('./authMiddleware');
const tarefas = require('./tarefaService');

const app = express();
const PORT = 3001;
app.use(express.json());

app.use(autenticarToken);

// Inicia repositório ao subir o servidor
tarefas.iniciarRepositorio();

app.post('/api/tarefas', async (req, res) => {
  const dados = { ...req.body, usuario_id: req.usuario.id };
  const nova = await tarefas.criar(dados);
  res.status(201).json(nova);
});

app.get('/api/tarefas', async (req, res) => {
  const lista = await tarefas.listarTodas();
  res.json(lista);
});

app.get('/api/tarefas/usuario/:id', async (req, res) => {
  const lista = await tarefas.listarPorUsuario(parseInt(req.params.id));
  res.json(lista);
});

app.put('/api/tarefas/:id', async (req, res) => {
  const atualizada = await tarefas.atualizar(req.params.id, req.body);
  res.json(atualizada);
});

app.delete('/api/tarefas/:id', async (req, res) => {
  await tarefas.deletar(req.params.id);
  res.status(204).send("apagado");
});

app.listen(PORT, () => {
  console.log(`✅ Task Service rodando na porta ${PORT}`);
});
