// src/tarefaService.js
let repo;

async function iniciarRepositorio() {
  try {
    const db = require('./db');
    await db.conectar();
    repo = require('./repository/repositoryMongo');
  } catch (err) {
    console.log("⚠️ Falha ao conectar no MongoDB. Usando fallback local.");
    repo = require('./repository/repositoryLocal');
  }
}

module.exports = {
  iniciarRepositorio,
  criar: (dados) => repo.criarTarefa(dados),
  listarTodas: () => repo.listarTodas(),
  listarPorUsuario: (uid) => repo.listarPorUsuario(uid),
  atualizar: (id, dados) => repo.atualizarTarefa(id, dados),
  deletar: (id) => repo.deletarTarefa(id)
};
