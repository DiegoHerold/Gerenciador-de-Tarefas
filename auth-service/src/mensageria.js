const axios = require('axios');

async function emitirEvento(tipo, dados = {}) {
  if (!tipo) {
    console.warn('⚠️ Evento sem tipo especificado.');
    return;
  }

  try {
    await axios.post('http://event-queue-service:3004/api/evento', {
      tipo,
      dados
    });
    console.log(`📤 Evento "${tipo}" enviado ao event-queue-service`);
  } catch (err) {
    console.error('❌ Erro ao enviar evento para o event-queue-service:', err.message);
  }
}

module.exports = { emitirEvento };
