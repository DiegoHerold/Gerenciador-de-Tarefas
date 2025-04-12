// src/controllers/tarefaController.js
const TarefaModel = require('../models/tarefaModel');

module.exports = {
  criarTarefa: async (req, res) => {
    const { titulo, descricao, usuario_id } = req.body;
    try {
      const novaTarefa = await TarefaModel.criar({ titulo, descricao, usuario_id });
      res.status(201).json({ mensagem: 'Tarefa criada com sucesso.', tarefa: novaTarefa });
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao criar tarefa.' });
    }
  },
  listarPorUsuario: async (req, res) => {
    const { id } = req.params;
    try {
      const tarefasDoUsuario = await TarefaModel.listarPorUsuario(parseInt(id));
      res.json(tarefasDoUsuario);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao listar tarefas.' });
    }
  },
  listarTodas: async (req, res) => {
    try {
      const todas = await TarefaModel.listarTodas();
      res.json(todas);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao buscar tarefas.' });
    }
  },  
  atualizarTarefa: async (req, res) => {
    const { id } = req.params;
    const { titulo, descricao } = req.body;
    try {
      const atualizada = await TarefaModel.atualizar(id, { titulo, descricao });
      res.status(200).json({ mensagem: 'Tarefa atualizada com sucesso.', tarefa: atualizada });
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao atualizar tarefa.' });
    }
  },

  deletarTarefa: async (req, res) => {
    const { id } = req.params;
    try {
      await TarefaModel.deletar(id);
      res.status(200).json({ mensagem: 'Tarefa deletada com sucesso.' });
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao deletar tarefa.' });
    }
  }
};
