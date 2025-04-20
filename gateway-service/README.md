# 🚪 Gateway-Service

Microsserviço responsável por atuar como **porta de entrada unificada** da aplicação. Todas as requisições passam por ele, onde são **validadas via JWT** e **redirecionadas para o microsserviço apropriado**, funcionando como um **proxy reverso inteligente**.


🔙 [Voltar ao README principal](../README.md)
---

## 📌 Funcionalidades

- 🔐 Validação automática de token JWT
- 🚦 Encaminhamento seguro para `auth-service`, `task-service` e `event-queue-service`
- 🧱 Middleware de autenticação para proteger endpoints
- 🌐 Roteamento para o painel BullBoard
- 🔁 Centralização de entrada (ideal para ambientes de produção)

---

## 🧠 Fluxo visual

```
           [ Cliente Frontend ]
                    │
             Requisição HTTP
                    │
                    ▼
          ┌─────────────────────┐
          │  🚪 Gateway-Service │
          └─────────────────────┘
            │     │      │
            ▼     ▼      ▼
   [Auth-Service] [Task-Service] [Event/BullBoard]
      (3001)         (3002)         (3004)

      Ex: /api/usuarios/cadastro
           └─▶ JWT + Proxy p/ auth
```

---

## 📁 Estrutura de Arquivos

```
src/
├── index.js     # Inicializa servidor, define rotas proxy
└── auth.js      # Middleware JWT para autenticação
```

---

## ⚙️ Variáveis de Ambiente

```env
PORT=8081
JWT_SECRET=suasecret
```

---

## ▶️ Rotas Disponíveis

| Caminho no Gateway        | Redireciona para                     |
|---------------------------|--------------------------------------|
| `/api/usuarios/...`       | `auth-service` (porta 3001)          |
| `/api/tarefas/...`        | `task-service` (porta 3002)          |
| `/dashboard/`             | `event-queue-service` (porta 3004)   |

---

## 🌐 Acesso

Após subir com Docker:

- Gateway geral: [http://localhost:8081](http://localhost:8081)
- Painel BullBoard via proxy: [http://localhost:8081/dashboard/](http://localhost:8081/dashboard/)

---

## 🔗 Conexões

- 🔄 Proxy para: [`auth-service`](../auth-service/README.md)
- ✅ Redireciona para: [`task-service`](../task-service/README.md)
- 🧭 Acesso ao painel: [`event-queue-service`](../event-queue-service/README.md)

---

## 📬 Contato

Para dúvidas ou sugestões, abra uma issue no repositório principal.

---
