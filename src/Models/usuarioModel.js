// // src/models/usuarioModel.js
const db = require('../config/database');


let usuarios = [];
let id = 1;

module.exports = {
  criar: ({ nome, email, senha }) => {
    const novo = { id: id++, nome, email, senha };
    usuarios.push(novo);
    return Promise.resolve(novo);
  },

  autenticar: (email, senha) => {
    const user = usuarios.find(u => u.email === email && u.senha === senha);
    return Promise.resolve(user);
  },
  getById: (id) => {
    const usuario = usuarios.find(u => u.id == id);
    return Promise.resolve(usuario);
  },  
  atualizar: ({ id, nome, email, senha }) => {
    const user = usuarios.find(u => u.id == id);
    if (!user) return Promise.reject('Usuário não encontrado');
    user.nome = nome;
    user.email = email;
    user.senha = senha;
    return Promise.resolve(user);
  },

  deletar: (id) => {
    usuarios = usuarios.filter(u => u.id != id);
    return Promise.resolve();
  }
};

// module.exports = {
//   criar: ({ nome, email, senha }) => {
//     return new Promise((resolve, reject) => {
//       const query = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
//       db.query(query, [nome, email, senha], (err, result) => {
//         if (err) return reject(err);
//         resolve({ id: result.insertId, nome, email });
//       });
//     });
//   },

//   autenticar: (email, senha) => {
//     return new Promise((resolve, reject) => {
//       const query = 'SELECT * FROM usuarios WHERE email = ? AND senha = ?';
//       db.query(query, [email, senha], (err, results) => {
//         if (err) return reject(err);
//         resolve(results[0]); // retorna usuário se encontrado
//       });
//     });
//   },

//   atualizar: ({ id, nome, email, senha }) => {
//     return new Promise((resolve, reject) => {
//       const query = 'UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?';
//       db.query(query, [nome, email, senha, id], (err, result) => {
//         if (err) return reject(err);
//         resolve(result);
//       });
//     });
//   },

//   deletar: (id) => {
//     return new Promise((resolve, reject) => {
//       const query = 'DELETE FROM usuarios WHERE id = ?';
//       db.query(query, [id], (err, result) => {
//         if (err) return reject(err);
//         resolve(result);
//       });
//     });
//   }
// };
