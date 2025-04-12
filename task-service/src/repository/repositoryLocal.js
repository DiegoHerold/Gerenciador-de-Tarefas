// src/repository/repositoryLocal.js
let tarefas = [];
let id = 1;

module.exports = {
  criarTarefa: async (dados) => {
    const nova = { id: id++, ...dados };
    tarefas.push(nova);
    return nova;
  },
  listarTodas: async () => tarefas,
  listarPorUsuario: async (uid) => tarefas.filter(t => t.usuario_id == uid),
  atualizarTarefa: async (id, dados) => {
    const t = tarefas.find(t => t.id == id);
    if (!t) return null;
    Object.assign(t, dados);
    return t;
  },
  deletarTarefa: async (id) => {
    tarefas = tarefas.filter(t => t.id != id);
  }
};
