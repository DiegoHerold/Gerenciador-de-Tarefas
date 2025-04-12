require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
let db;

async function conectar() {
  await client.connect();
  db = client.db(process.env.MONGO_DB || 'Tarefas');
  console.log("✅ Conectado ao MongoDB Atlas(Tarefa)");
}

function getDB() {
  return db;
}

module.exports = { conectar, getDB };

