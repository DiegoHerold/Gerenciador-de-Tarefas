
# Microtask System - API RESTful

Este projeto é composto por dois microsserviços independentes: `auth-service` e `task-service`. Ambos são APIs RESTful construídas com Node.js e Express, utilizando MongoDB como banco de dados principal e fallback local (em memória) caso o banco esteja indisponível.

---

## 📦 Serviços

### 🔐 Auth-Service (`/api/usuarios`)

Rotas para autenticação e gerenciamento de usuários:

| Método | Rota                        | Descrição                            |
|--------|-----------------------------|----------------------------------------|
| POST   | `/api/usuarios/cadastro`    | Cria um novo usuário                  |
| POST   | `/api/usuarios/login`       | Login com e-mail e senha, retorna JWT |
| GET    | `/api/usuarios/:id`         | Retorna informações do usuário por ID |
| PUT    | `/api/usuarios/atualizar`   | Atualiza nome, e-mail ou senha        |
| DELETE | `/api/usuarios/deletar`     | Remove a conta do usuário             |
| POST   | `/api/usuarios/logout`      | Logout simbólico                      |

> JWT gerado com segredo `JWT_SECRET`, necessário para acessar rotas protegidas no `task-service`.

---

### ✅ Task-Service (`/api/tarefas`)

Rotas para gerenciamento de tarefas (protegidas com JWT):

| Método | Rota                            | Descrição                                     |
|--------|----------------------------------|-----------------------------------------------|
| POST   | `/api/tarefas`                  | Cria uma nova tarefa                          |
| GET    | `/api/tarefas`                  | Lista todas as tarefas                        |
| GET    | `/api/tarefas/usuario/:id`      | Lista tarefas de um usuário específico        |
| PUT    | `/api/tarefas/:id`              | Atualiza uma tarefa existente                 |
| DELETE | `/api/tarefas/:id`              | Deleta uma tarefa por ID                      |

> Envie o token no cabeçalho `Authorization: Bearer SEU_TOKEN`.

---

## ⚙️ Execução

### Rodando localmente

```bash
# Instale dependências em cada serviço
cd auth-service && npm install
cd ../task-service && npm install

# Rode os serviços
node src/index.js
```

### Com Docker

```bash
docker-compose up --build
```

---

## 🧪 Testes via Postman

Use os endpoints descritos acima com conteúdo JSON.  
Comece sempre com o cadastro e login para obter o token JWT.

---

## 💾 Conexão com banco

Ambos os serviços utilizam MongoDB Atlas (ou local) e fallback automático para banco em memória se a conexão falhar.

---

## 🔐 Segurança

- Autenticação por JWT
- Proteção de rotas do `task-service` com middleware
- Senhas dos usuários com hash (`bcryptjs`)


