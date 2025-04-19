const fila = require('./fila');
require('dotenv').config();

console.log('📡 Notifier escutando fila eventos...');

fila.process('*', async (job) => {
  const { name, data } = job;

  const log = {
    usuario_criado: () => `✅ Novo usuário: ${data.usuario?.email} (${data.usuario?.role})`,
    usuario_logado: () => `🔐 Login: ${data.usuario?.email}`,
    usuario_atualizado: () => `✏️ Usuário atualizado: ${data.usuario?.id}`,
    usuario_removido: () => `🗑️ Usuário removido: ${data.usuario_id}`,
    tarefa_criada: () => `📝 Nova tarefa: ${data.titulo} (user ${data.usuario_id})`,
    tarefa_atualizada: () => `✏️ Tarefa atualizada: ${data.id}`,
    tarefa_removida: () => `🗑️ Tarefa removida: ${data.id}`,
  };

  const msg = log[name] ? log[name]() : `📨 Evento: ${name} (sem log customizado)`;
  console.log(msg);
});
