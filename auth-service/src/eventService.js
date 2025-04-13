const amqp = require('amqplib');

let canal = null;

async function conectar() {
  if (canal) return canal;

  try {
    const conexao = await amqp.connect('amqp://guest:guest@rabbitmq:5672');
    canal = await conexao.createChannel();
    console.log('📡 Conectado ao RabbitMQ (fila "usuarios")');
    return canal;
  } catch (err) {
    console.error('❌ Erro ao conectar no RabbitMQ:');
    return null;
  }
}

async function emitirEvento(evento, dados = {}) {
    if (!evento) {
      console.warn('⚠️ Tentativa de emitir evento sem nome definido');
      return;
    }
  
    const canal = await conectar();
    if (!canal) return;
  
    const payload = JSON.stringify({ evento, ...dados });
  
    await canal.assertQueue('usuarios');
    canal.sendToQueue('usuarios', Buffer.from(payload));
  }
  

module.exports = { emitirEvento };
