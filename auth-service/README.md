# 🔐 Auth-Service

Microsserviço responsável pela autenticação, criação e gerenciamento de usuários. Utiliza MongoDB com fallback local, autenticação via JWT e controle de acesso por papéis (RBAC). Publica eventos para outros serviços através da fila.


🔙 [Voltar ao README principal](../README.md)
---

## 📌 Funcionalidades

- Cadastro de usuários
- Login e geração de JWT
- Atualização e remoção de conta
- Middleware de autenticação e autorização (admin, comum)
- Publicação de eventos em fila para outros serviços

---

## 🚀 Rotas disponíveis

| Método | Rota                        | Descrição                            |
|--------|-----------------------------|----------------------------------------|
| POST   | `/api/usuarios/cadastro`    | Cria um novo usuário                  |
| POST   | `/api/usuarios/login`       | Login com e-mail e senha, retorna JWT |
| GET    | `/api/usuarios/:id`         | Retorna informações do usuário por ID |
| PUT    | `/api/usuarios/atualizar`   | Atualiza nome, e-mail ou senha        |
| DELETE | `/api/usuarios/deletar`     | Remove a conta do usuário             |
| POST   | `/api/usuarios/logout`      | Finaliza a sessão                     |

> Todas as rotas protegidas utilizam autenticação JWT.

---

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env` na raiz com o seguinte:

```env
PORT=3001
JWT_SECRET=suasecret
MONGO_URL=mongodb://localhost:27017/auth-db
RABBITMQ_URL=amqp://localhost
```

---

## 🧱 Estrutura de Pastas

```
src/
├── authMiddleware.js       # Verifica token JWT
├── autorizarRole.js        # Valida papel do usuário (RBAC)
├── db.js                   # MongoDB + fallback
├── mensageria.js           # Publicador de eventos
├── usuarioService.js       # Lógica de usuários
└── repository/
    ├── repositoryMongo.js  # MongoDB
    └── repositoryLocal.js  # Local fallback
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
- Comunica-se com o `gateway-service` via rota `/api/usuarios`

---

## 📬 Contato

Para dúvidas ou sugestões, abra uma issue no repositório principal.



---

## 📦 Serviços

| Serviço             | Descrição                                       | Readme |
|---------------------|-------------------------------------------------|--------|
| 🔐 Auth-Service      | Cadastro, login e gerenciamento de usuários     | [Ler mais](./auth-service/README.md) |
| ✅ Task-Service      | Criação e controle de tarefas por usuário       | [Ler mais](./task-service/README.md) |
| 📨 Event-Queue       | Fila de eventos com Redis + Bull                | [Ler mais](./event-queue-service/README.md) |
| 📡 Notifier          | Consome fila e executa ações/alertas            | [Ler mais](./notifier-service/README.md) |
| 🚪 Gateway-Service   | Entrada unificada, autenticação e roteamento    | [Ler mais](./gateway-service/README.md) |

---