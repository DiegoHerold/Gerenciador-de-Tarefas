# 🚪 Gateway-Service

Microsserviço responsável por atuar como porta de entrada unificada da aplicação. Ele faz roteamento para os serviços internos (`auth-service`, `task-service`, `event-queue-service`, etc.), validando tokens JWT e aplicando regras de autenticação.

🔙 [Voltar ao README principal](../README.md)

---

## 📌 Funcionalidades

- Roteamento centralizado para todos os microsserviços
- Verificação automática do token JWT
- Proteção de rotas por middleware
- Proxy de requisições para serviços internos

---

## 📁 Estrutura de Arquivos

```
src/
├── index.js     # Inicializa servidor e define rotas proxy
└── auth.js      # Middleware de autenticação JWT
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

> Todas as requisições são interceptadas e validadas pelo middleware `auth.js`.

---

## 🌐 Acesso

Após subir com Docker:

- Gateway: [http://localhost:8081](http://localhost:8081)
- Painel BullBoard via gateway: [http://localhost:8081/dashboard/](http://localhost:8081/dashboard/)

---

## 🔗 Conexões

- Encaminha para: [`auth-service`](../auth-service/README.md), [`task-service`](../task-service/README.md), [`event-queue-service`](../event-queue-service/README.md)
- Roteia acesso ao painel: [`notifier-service`](../notifier-service/README.md)

---

## 📬 Contato

Para dúvidas ou sugestões, abra uma issue no repositório principal.
