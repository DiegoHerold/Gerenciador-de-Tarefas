// src/repository/repositoryMongo.js
const { getDB } = require('../db');

const collection = () => getDB().collection("Tarefa");

module.exports = {
  criarTarefa: async (dados) => {
    const res = await collection().insertOne(dados);
    return { id: res.insertedId, ...dados };
  },
  listarTodas: async () => await collection().find().toArray(),
  listarPorUsuario: async (uid) =>
    await collection().find({ usuario_id: uid }).toArray(),
  atualizarTarefa: async (id, dados) => {
    const { ObjectId } = require('mongodb');
    await collection().updateOne({ _id: new ObjectId(id) }, { $set: dados });
    return { id, ...dados };
  },
  deletarTarefa: async (id) => {
    const { ObjectId } = require('mongodb');
    await collection().deleteOne({ _id: new ObjectId(id) });
  }
};
