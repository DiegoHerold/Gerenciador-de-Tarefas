
let usuarios = [];
let id = 1;

module.exports = {
  criar: async (usuario) => {
    const novo = { id: id++, ...usuario };
    usuarios.push(novo);
    return novo;
  },
  listarPorId: async (uid) => usuarios.find(u => u.id == uid),
  atualizar: async (uid, dados) => {
    const usuario = usuarios.find(u => u.id == uid);
    if (!usuario) return null;
    Object.assign(usuario, dados);
    return usuario;
  },
  deletar: async (uid) => {
    usuarios = usuarios.filter(u => u.id != uid);
  },
  buscarPorEmail: async (email) => usuarios.find(u => u.email === email)
};
