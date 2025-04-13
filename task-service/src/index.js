const express = require('express');
const autenticarToken = require('./authMiddleware');
const autorizarRole = require('./autorizarRole');
const tarefas = require('./tarefaService');
const { conectarRabbit, enviarMensagem } = require('./mensageria');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(autenticarToken);

tarefas.iniciarRepositorio();
conectarRabbit();

app.post('/api/tarefas', autorizarRole(['comum', 'admin']), async (req, res) => {
  const dados = { ...req.body, usuario_id: req.usuario.id };
  const nova = await tarefas.criar(dados);

  enviarMensagem({
    evento: 'tarefa_criada',
    tarefa: nova
  });

  res.status(201).json(nova);
});

app.get('/api/tarefas', autorizarRole(['admin']), async (req, res) => {
  const lista = await tarefas.listarTodas();
  res.json(lista);
});

app.get('/api/tarefas/usuario/:id', autorizarRole(['comum', 'admin', 'moderador']), async (req, res) => {
  const usuario_id = parseInt(req.params.id);
  if (req.usuario.role === 'comum' && usuario_id !== req.usuario.id) {
    return res.status(403).json({ erro: 'Acesso negado' });
  }
  const lista = await tarefas.listarPorUsuario(usuario_id);
  res.json(lista);
});

app.put('/api/tarefas/:id', autorizarRole(['comum', 'admin']), async (req, res) => {
  const atualizada = await tarefas.atualizar(req.params.id, req.body);

  enviarMensagem({
    evento: 'tarefa_atualizada',
    tarefa: atualizada
  });

  res.json(atualizada);
});

app.delete('/api/tarefas/:id', autorizarRole(['admin']), async (req, res) => {
  await tarefas.deletar(req.params.id);

  enviarMensagem({
    evento: 'tarefa_removida',
    tarefa_id: parseInt(req.params.id)
  });

  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`✅ Task Service rodando na porta ${PORT}`);
});
