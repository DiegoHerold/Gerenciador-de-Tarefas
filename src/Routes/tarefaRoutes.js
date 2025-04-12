const express = require('express');
const router = express.Router();
const tarefaController = require('../controllers/tarefaController');

// Criar nova tarefa
router.post('/', tarefaController.criarTarefa);

// Listar tarefas por usuário
router.get('/usuario/:id', tarefaController.listarPorUsuario);

// Listar todas as tarefas
router.get('/', tarefaController.listarTodas);

// Atualizar tarefa
router.put('/:id', tarefaController.atualizarTarefa);

// Deletar tarefa
router.delete('/:id', tarefaController.deletarTarefa);

module.exports = router;
