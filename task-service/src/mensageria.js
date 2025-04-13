const amqp = require('amqplib');

let canal;

let tentativas = 5;

async function conectarRabbit() {
  while (tentativas > 0) {
    try {
      const conexao = await amqp.connect('amqp://guest:guest@rabbitmq:5672');
      const canal = await conexao.createChannel();
      await canal.assertQueue('tarefas');
      canalEnvio = canal;
      console.log('📡 Conectado ao RabbitMQ e canal pronto');
      return;
    } catch (erro) {
      tentativas--;
      console.error(`❌ Erro ao conectar no RabbitMQ: ${erro.message}`);
      if (tentativas === 0) {
        console.error('❌ Não foi possível conectar ao RabbitMQ após várias tentativas.');
        return;
      }
      console.log(`🔁 Tentando novamente em 5s... (${tentativas} tentativas restantes)`);
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
}


function enviarMensagem(dados) {
  if (!canal) return;
  canal.sendToQueue('tarefas', Buffer.from(JSON.stringify(dados)));
}

module.exports = { conectarRabbit, enviarMensagem };
