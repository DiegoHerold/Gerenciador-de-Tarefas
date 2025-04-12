const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Cadastro de novo usuário
router.post('/cadastro', usuarioController.criarUsuario);

// Login (entrar na conta)
router.post('/login', usuarioController.login);

// Mostra Informações dos Usuarios
router.get('/:id', usuarioController.getUsuario);

// Atualizar dados pessoais
router.put('/atualizar', usuarioController.atualizarUsuario);

// Logout (sair da conta)
router.post('/logout', usuarioController.logout);

// Deletar conta
router.delete('/deletar', usuarioController.deletarUsuario);

module.exports = router;
