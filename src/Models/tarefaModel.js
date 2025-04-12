// src/models/tarefaModel.js
// const db = require('../config/database');



let tarefas = [];
let id = 1;

module.exports = {
  criar: ({ titulo, descricao, usuario_id }) => {
    const nova = { id: id++, titulo, descricao, usuario_id };
    tarefas.push(nova);
    return Promise.resolve(nova);
  },
  listarPorUsuario: (usuario_id) => {
    const tarefasUsuario = tarefas.filter(t => t.usuario_id == usuario_id);
    return Promise.resolve(tarefasUsuario);
  }, 
  
  listarTodas: () => {
    return Promise.resolve(tarefas); // retorna o array completo
  },  

  atualizar: (id, { titulo, descricao }) => {
    const tarefa = tarefas.find(t => t.id == id);
    if (!tarefa) return Promise.reject('Tarefa não encontrada');
    tarefa.titulo = titulo;
    tarefa.descricao = descricao;
    return Promise.resolve(tarefa);
  },

  deletar: (id) => {
    tarefas = tarefas.filter(t => t.id != id);
    return Promise.resolve();
  }
};


// module.exports = {
//   criar: ({ titulo, descricao, usuario_id }) => {
//     return new Promise((resolve, reject) => {
//       const query = 'INSERT INTO tarefas (titulo, descricao, usuario_id) VALUES (?, ?, ?)';
//       db.query(query, [titulo, descricao, usuario_id], (err, result) => {
//         if (err) return reject(err);
//         resolve({ id: result.insertId, titulo, descricao, usuario_id });
//       });
//     });
//   },

//   atualizar: (id, { titulo, descricao }) => {
//     return new Promise((resolve, reject) => {
//       const query = 'UPDATE tarefas SET titulo = ?, descricao = ? WHERE id = ?';
//       db.query(query, [titulo, descricao, id], (err, result) => {
//         if (err) return reject(err);
//         resolve(result);
//       });
//     });
//   },

//   deletar: (id) => {
//     return new Promise((resolve, reject) => {
//       const query = 'DELETE FROM tarefas WHERE id = ?';
//       db.query(query, [id], (err, result) => {
//         if (err) return reject(err);
//         resolve(result);
//       });
//     });
//   }
// };
