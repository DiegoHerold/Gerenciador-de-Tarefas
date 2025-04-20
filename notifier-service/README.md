# 📡 Notifier-Service

Microsserviço responsável por escutar e processar eventos assíncronos da fila Redis (BullMQ), disparando ações como logs de sistema, notificações e futuras integrações como e-mail e Slack.

🔙 [Voltar ao README principal](../README.md)

---

## 📌 Funcionalidades

- 🧠 Interpretação dinâmica de eventos
- 🪵 Geração de logs por tipo de ação (criação, login, remoção)
- 📤 Emissão de notificações internas (e.g. console, arquivo)
- 📦 Extensível para novos canais: e-mail, push, webhook, etc.
- 🔁 Conectado ao `event-queue-service` via BullMQ

---

## 🧠 Como funciona

```
[event-queue-service] ─▶ [notifier-service]
        (BullMQ Redis)         │
                               ├── console.log()
                               ├── salvar em arquivo
                               ├── emitir alertas futuros (Slack, e-mail...)
                               └── etc
```

---

## ⚙️ Variáveis de Ambiente

```env
REDIS_URL=redis://localhost:6379
```

---

## 📁 Estrutura de Arquivos

```
src/
├── fila.js       # Conexão com BullMQ e Redis
└── index.js      # Processa e interpreta os eventos da fila
```

---

## ▶️ Executando

### Instalação

```bash
npm install
```

### Inicialização

```bash
node src/index.js
```

---

## 🧪 Exemplos de eventos tratados

| Evento               | Descrição                                    | Ação executada        |
|----------------------|----------------------------------------------|------------------------|
| `usuario_criado`     | Novo cadastro de usuário                     | Log no console         |
| `usuario_logado`     | Login efetuado                               | Log de autenticação    |
| `usuario_atualizado` | Dados do usuário atualizados                 | Log informativo        |
| `usuario_removido`   | Conta do usuário foi removida                | Log de segurança       |
| `tarefa_criada`      | Nova tarefa foi criada                       | Log básico             |

---

## 🔗 Conexões

- **Escuta eventos de**: [`event-queue-service`](../event-queue-service/README.md)
- **Possíveis destinos futuros**:
  - 📨 Email (NodeMailer)
  - 📱 Notificação mobile (Firebase)
  - 📂 Log persistente (MongoDB, arquivo)
  - 💬 Slack / Discord

---

## 📬 Contato

Para sugestões ou dúvidas, abra uma issue no repositório principal.

---
