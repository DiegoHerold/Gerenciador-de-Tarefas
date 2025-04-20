# ✅ Task-Service

Microsserviço responsável pelo gerenciamento de tarefas dos usuários. Permite criação, atualização, visualização e exclusão de tarefas com controle de acesso baseado em papéis (RBAC). Utiliza MongoDB com fallback local e integração com a fila de eventos.


🔙 [Voltar ao README principal](../README.md)
---

## 📌 Funcionalidades

- Criação de tarefas
- Edição e remoção por dono (usuário comum)
- Visualização de todas as tarefas (admin ou moderador)
- Proteção por autenticação e papel de usuário
- Comunicação com fila para notificações e logs

---

## 🚀 Rotas disponíveis

| Método | Rota                                 | Descrição                                  |
|--------|--------------------------------------|----------------------------------------------|
| POST   | `/api/tarefas`                       | Cria nova tarefa                             |
| PUT    | `/api/tarefas/:id`                   | Atualiza tarefa por ID                       |
| DELETE | `/api/tarefas/:id`                   | Remove tarefa por ID                         |
| GET    | `/api/tarefas`                       | Lista todas as tarefas (moderador/admin)     |
| GET    | `/api/tarefas/usuario/:id`           | Lista tarefas de um usuário específico       |

> Rotas protegidas com autenticação JWT e middleware de papéis.

---

## ⚙️ Variáveis de Ambiente

```env
PORT=3002
JWT_SECRET=suasecret
MONGO_URL=mongodb://localhost:27017/task-db
RABBITMQ_URL=amqp://localhost
```

---

## 🧱 Estrutura de Pastas

```
src/
├── authMiddleware.js       # Middleware JWT
├── autorizarRole.js        # Controle RBAC
├── db.js                   # MongoDB + fallback local
├── mensageria.js           # Integração com fila
├── tarefaService.js        # Regras de tarefas
└── repository/
    ├── repositoryMongo.js  # MongoDB
    └── repositoryLocal.js  # Fallback
```

---

## 🧪 Testes

```bash
npm install
npm test
```

---

## 🔗 Conexões

- Publica eventos para: `event-queue-service`
- Comunica-se com o `gateway-service` via `/api/tarefas`
- Requer token JWT gerado por: [`auth-service`](../auth-service/README.md)

---

## 📬 Contato

Para dúvidas ou sugestões, abra uma issue no repositório principal.
