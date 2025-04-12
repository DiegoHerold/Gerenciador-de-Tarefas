// src/controllers/usuarioController.js
const UsuarioModel = require('../models/usuarioModel');

module.exports = {
  criarUsuario: async (req, res) => {
    const { nome, email, senha } = req.body;
    try {
      const usuario = await UsuarioModel.criar({ nome, email, senha });
      res.status(201).json({ mensagem: 'Usuário criado!', usuario });
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao criar usuário.' });
    }
  },

  login: async (req, res) => {
    const { email, senha } = req.body;
    try {
      const usuario = await UsuarioModel.autenticar(email, senha);
      if (!usuario) {
        return res.status(401).json({ erro: 'Credenciais inválidas.' });
      }
      res.status(200).json({ mensagem: 'Login realizado com sucesso.', usuario });
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao fazer login.' });
    }
  },

  getUsuario: async (req, res) => {
    const { id } = req.params;
    try {
      const usuario = await UsuarioModel.getById(parseInt(id));
      if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado.' });
      }
      res.json(usuario);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao buscar usuário.' });
    }
  },
  

  atualizarUsuario: async (req, res) => {
    const { id, nome, email, senha } = req.body;
    try {
      const atualizado = await UsuarioModel.atualizar({ id, nome, email, senha });
      res.status(200).json({ mensagem: 'Dados atualizados com sucesso.', atualizado });
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao atualizar dados.' });
    }
  },

  logout: (req, res) => {
    // Em APIs REST, o "logout" pode ser apenas simbólico (cliente apaga o token)
    res.status(200).json({ mensagem: 'Logout realizado com sucesso.' });
  },

  deletarUsuario: async (req, res) => {
    const { id } = req.body;
    try {
      await UsuarioModel.deletar(id);
      res.status(200).json({ mensagem: 'Usuário deletado com sucesso.' });
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao deletar usuário.' });
    }
  }
};
