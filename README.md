# 🧠 Gerenciador de Tarefas - Microsserviços

Sistema distribuído para gerenciamento de usuários e tarefas, com comunicação assíncrona entre microsserviços, autenticação JWT, mensageria com Redis + Bull, e um gateway unificado para requisições externas.

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

## 🏗️ Arquitetura

```
[ Client ]
   │
   ▼
[ Gateway-Service ]
   ├──▶ [ Auth-Service ] ─── MongoDB / fallback
   ├──▶ [ Task-Service ] ─── MongoDB / fallback
   └──▶ [ Event-Queue-Service ] ─── Redis (Bull)
                    │
                    ▼
           [ Notifier-Service ]
```

---

## 🚀 Executando o projeto

### Pré-requisitos

- Docker + Docker Compose
- Node.js (para execuções manuais)

### Passo a passo com Docker:

```bash
git clone https://github.com/seuusuario/seu-repo.git
cd Gerenciador-de-Tarefas-Tarefas-MicroServi-os
docker-compose up --build
```

> Acesse via navegador: `http://localhost:3000`

---

## 🔧 Tecnologias utilizadas

- **Node.js** + **Express**
- **MongoDB** (com fallback em memória)
- **Redis** + **BullMQ**
- **JWT** com controle de acesso baseado em papéis (RBAC)
- **Docker** & **Docker Compose**
- **BullBoard** para visualização da fila
- Arquitetura de **Microsserviços**
- **API Gateway** com proxy e autenticação centralizada

---

## 🧪 Testes (em construção)

Cada microserviço poderá ser testado isoladamente com:

```bash
cd nome-do-servico
npm test
```

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Você pode:

- Criar uma *issue* com sugestões ou problemas
- Abrir um *pull request* com melhorias
- Discutir ideias para novos recursos

---

## 📬 Contato

Para dúvidas ou contribuições, entre em contato por e-mail ou abra uma issue.
