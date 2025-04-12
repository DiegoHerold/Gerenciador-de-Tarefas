
const { getDB } = require('../db');
const { ObjectId } = require('mongodb');

const collection = () => getDB().collection("Usuario");

module.exports = {
  criar: async (usuario) => {
    const res = await collection().insertOne(usuario);
    return { id: res.insertedId, ...usuario };
  },
  listarPorId: async (id) => await collection().findOne({ _id: new ObjectId(id) }),
  atualizar: async (id, dados) => {
    await collection().updateOne({ _id: new ObjectId(id) }, { $set: dados });
    return { id, ...dados };
  },
  deletar: async (id) => {
    await collection().deleteOne({ _id: new ObjectId(id) });
  },
  buscarPorEmail: async (email) => await collection().findOne({ email })
};
