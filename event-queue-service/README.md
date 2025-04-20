# 📨 Event-Queue-Service

Microsserviço responsável por centralizar eventos do sistema em uma fila assíncrona com **Redis** e **BullMQ**. Ele enfileira eventos gerados por outros microsserviços e os processa por meio de um *worker*. Também fornece um painel de visualização via **BullBoard**.


🔙 [Voltar ao README principal](../README.md)
---

## 📌 Funcionalidades

- 📬 Fila de eventos com BullMQ (baseada em Redis)
- ⚙️ Processamento assíncrono por workers
- 🔁 Integração com serviços produtores (auth/task)
- 📊 Monitoramento da fila via BullBoard

---

## 🧠 Como funciona

```
[auth-service] ─┬─▶
                │
[task-service] ─┘     Envia eventos
     │
     ▼
[event-queue-service] ──▶ [notifier-service]
         ▲
         │
   Visualiza via
     BullBoard
```

---

## ⚙️ Variáveis de Ambiente

```env
REDIS_URL=redis://localhost:6379
PORT=3005
```

---

## 📁 Estrutura de Arquivos

```
src/
├── eventos.js    # Define tipos e dados dos eventos
├── fila.js       # Instância BullMQ com Redis
└── worker.js     # Processa eventos e envia ações
```

---

## ▶️ Executando

### Instalação:

```bash
npm install
```

### Inicialização:

```bash
node src/worker.js
```

> O serviço escutará eventos e você poderá visualizar o painel em tempo real.

---

## 🔗 BullBoard - Painel de Monitoramento

- 🌐 Interface Web para visualizar e controlar a fila BullMQ
- ✅ Acompanhe tarefas em tempo real
- 🔁 Reenvie tarefas com falha
- 🧪 Depure o comportamento do sistema

### URLs disponíveis:

- Painel BullBoard: [http://localhost:3004/dashboard/](http://localhost:3004/dashboard/)
- Acesso via gateway: [http://localhost:8081/dashboard/](http://localhost:8081/dashboard/)

---

## 🔗 Conexões

- **Recebe eventos de**: [`auth-service`](../auth-service/README.md), [`task-service`](../task-service/README.md)
- **Despacha eventos para**: [`notifier-service`](../notifier-service/README.md)

---

## 📬 Contato

Para dúvidas ou sugestões, abra uma issue no repositório principal.

---
