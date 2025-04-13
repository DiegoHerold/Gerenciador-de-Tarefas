const amqp = require('amqplib');

async function iniciar() {
  try {
    const conexao = await amqp.connect('amqp://guest:guest@rabbitmq:5672');
    const canal = await conexao.createChannel();

    await canal.assertQueue('tarefas');
    await canal.assertQueue('usuarios');

    console.log('📡 Notifier escutando as filas: [tarefas, usuarios]');

    // 🔔 Escutar fila de tarefas
    canal.consume('tarefas', (msg) => {
      if (!msg) return;

      try {
        const dados = JSON.parse(msg.content.toString());
        const evento = dados.evento;

        switch (evento) {
          case 'tarefa_criada':
            console.log(`📬 Tarefa criada: ${dados.tarefa?.titulo}`);
            break;
          case 'tarefa_atualizada':
            console.log(`✏️ Tarefa atualizada: ${dados.tarefa?.titulo}`);
            break;
          case 'tarefa_removida':
            console.log(`❌ Tarefa removida (ID: ${dados.tarefa_id})`);
            break;
          default:
            console.warn(`📦 [tarefas] Evento desconhecido: ${evento}`);
        }
      } catch (erro) {
        console.error('❌ Erro ao processar mensagem de tarefas:');
      }

      canal.ack(msg);
    });

    // 👤 Escutar fila de usuários
    canal.consume('usuarios', (msg) => {
      if (!msg) return;

      try {
        const dados = JSON.parse(msg.content.toString());
        const evento = dados.evento;

        switch (evento) {
          case 'usuario_criado':
            console.log(`👤 Novo usuário: ${dados.usuario?.email}`);
            break;
          case 'usuario_logado':
            console.log(`🔐 Login de usuário: ${dados.usuario?.email}`);
            break;
          case 'usuario_atualizado':
            console.log(`📝 Usuário atualizado: ${dados.usuario?.email || '[sem email]'}`);
            break;
          case 'usuario_removido':
            console.log(`🚫 Usuário removido (ID: ${dados.usuario_id})`);
            break;
          default:
            console.warn(`📦 [usuarios] Evento desconhecido: ${evento}`);
        }
      } catch (erro) {
        console.error('❌ Erro ao processar mensagem de usuários:');
      }

      canal.ack(msg);
    });

  } catch (erro) {
    console.error('❌ Erro no Notifier:', erro.message);
  }
}

iniciar();
