
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
  criar: (dados) => repo.criar(dados),
  buscarPorEmail: (email) => repo.buscarPorEmail(email),
  listarPorId: (id) => repo.listarPorId(id),
  atualizar: (id, dados) => repo.atualizar(id, dados),
  deletar: (id) => repo.deletar(id)
};
