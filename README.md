<<<<<<< HEAD
# Fake API - Servidor RESTful

Uma API RESTful completa e flexível construída com Node.js e Express, seguindo princípios de arquitetura limpa e separação de responsabilidades.

## Características

- **Arquitetura Limpa**: Separação clara de responsabilidades
- **CRUD Dinâmico**: Criação automática de endpoints para qualquer recurso
- **Validação Robusta**: Middlewares de validação para dados de entrada
- **Paginação Inteligente**: Sistema de paginação com limites configuráveis
- **Busca Textual**: Filtros de busca em todos os campos
- **Logging Avançado**: Sistema de logs com timestamps e cores
- **CORS Configurável**: Middleware CORS personalizável
- **Tratamento de Erros**: Sistema robusto de tratamento de erros
- **Interface Web**: Interface gráfica para gerenciar recursos
- **Health Checks**: Sistema completo de monitoramento de saúde
- **Autenticação Mock JWT**: Login fake com tokens, roles e scopes, senhas com bcrypt
- **Rate Limiting**: Proteção contra brute force no login (10 tentativas / 15 min por IP)

---

## Arquitetura do Projeto

| Caminho | Arquivo | Função Principal |
|---------|---------|------------------|
| **src/auth/** | `crud-policy.js` | Define escopos de CRUD (`create/read/update/delete`) baseados no recurso |
| | `guard.js` | Middleware de autorização: verifica se o usuário tem o scope necessário |
| | `jwt.js` | Utilitário para criar e validar tokens JWT |
| | `mw-auth.js` | Middleware opcional que popula `req.user` com dados do token |
| | `user-store-file.js` | Lê os usuários do arquivo `db.json` (mock de autenticação) |
| **src/config/** | `app.js` | Configurações globais da aplicação (porta, env, CORS) |
| | `database.js` | Configurações do banco JSON (caminho e coleções padrão) |
| **src/controllers/** | `healthController.js` | Endpoints de health check e monitoramento |
| | `resourceController.js` | CRUD dinâmico para qualquer recurso (posts, users, etc.) |
| | `systemController.js` | Endpoints internos do sistema (`/_reset`, `/__resources`, etc.) |
| **src/middleware/** | `cors.js` | Middleware para configuração de CORS |
| | `logger.js` | Middleware de logging com timestamps e cores |
| | `validation.js` | Middlewares para validação de JSON, ID e paginação |
| **src/routes/** | `auth.routes.js` | Rotas de autenticação (`/auth/login`, `/auth/refresh`) |
| | `healthRoutes.js` | Rotas de health check (`/health`, `/health/ping`, etc.) |
| | `resourceRoutes.js` | Rotas CRUD dinâmicas para qualquer recurso |
| | `systemRoutes.js` | Rotas internas de sistema (`/_docs`, `/__resources`, etc.) |
| **src/services/** | `databaseService.js` | Serviço que manipula os dados do `db.json` |
| **src/utils/** | `fileUtils.js` | Funções auxiliares para manipulação de arquivos |
| **src/** | `server.js` | Arquivo principal que inicializa o servidor Express |
| **data/** | `db.json` | Banco de dados em arquivo JSON |

---

## Instalação e Uso

### Pré-requisitos

- Node.js 14+
- npm

### Instalação

```bash
git clone https://github.com/samuelikz/fakeapi.git
cd fakeapi
npm install
cp .env.example .env   # edite conforme necessário
npm run dev
```

### Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Inicia em modo desenvolvimento com **nodemon** |
| `npm start` | Inicia em modo **produção** |
| `npm run reset` | Reseta o banco de dados para o estado inicial |

---

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto (use `.env.example` como base):

```env
# Servidor
NODE_ENV=development
PORT=8000

# Banco de dados
DB_PATH=./data/db.json

# CORS — use um domínio específico em produção (ex: https://meuapp.com)
# Com CORS_ORIGIN=*, credenciais (cookies/Authorization) NÃO são enviadas pelo browser
CORS_ORIGIN=*

# Autenticação JWT (opcional)
AUTH_ENABLED=false          # true para exigir token em todas as rotas de recursos
AUTH_JWT_SECRET=troque-por-um-secret-longo-e-aleatorio
AUTH_TOKEN_TTL=1h
```

> **Atenção**: nunca use `AUTH_JWT_SECRET` com valor padrão ou fraco em produção. Gere um valor aleatório com `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`.

---

## Health Checks

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/health` | Health check básico |
| GET | `/health/detailed` | Health detalhado |
| GET | `/health/ping` | Ping simples |
| GET | `/health/ready` | Readiness check |
| GET | `/health/live` | Liveness check |

```bash
curl http://localhost:8000/health
curl http://localhost:8000/health/detailed
```

---

## API Endpoints

### Endpoints do Sistema

| Método | Endpoint | Descrição | Auth necessária |
|--------|----------|-----------|-----------------|
| GET | `/__resources` | Lista recursos disponíveis com contagem | Não |
| GET | `/_docs` | Documentação da API | Não |
| POST | `/_ensure/:resource` | Cria item em um recurso | Escopo `create:*` |
| POST | `/_reset` | Reseta o banco de dados | Escopo `delete:*` |

> Com `AUTH_ENABLED=false` (padrão), os endpoints acima ficam livres. Ao ativar auth, apenas usuários com escopo `create:*` ou `delete:*` (ou `*:*`) podem usá-los.

### Endpoints CRUD Dinâmicos

Para qualquer recurso (ex.: `posts`, `users`, `products`):

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/:resource` | Lista itens |
| GET | `/:resource/:id` | Obtém item específico |
| POST | `/:resource` | Cria novo item |
| PUT | `/:resource/:id` | Atualiza totalmente |
| PATCH | `/:resource/:id` | Atualiza parcialmente |
| DELETE | `/:resource/:id` | Remove item |

### Parâmetros de Consulta

| Parâmetro | Descrição | Padrão |
|-----------|-----------|--------|
| `q` | Busca textual em todos os campos | — |
| `_page` | Número da página | `1` |
| `_limit` | Itens por página (máximo: 100) | `50` |
| `_meta` | Inclui metadados de paginação (`0` ou `1`) | `0` |

```bash
GET /posts?q=node&_page=2&_limit=10&_meta=1
```

---

## Autenticação Mock JWT

Suporte **opcional** a autenticação JWT, ideal para protótipos e testes de front-end com guards, roles e scopes.

> **Atenção**: este é um mock para desenvolvimento. Não use em produção sem implementar segurança real (banco de dados, HTTPS, refresh tokens persistidos, etc.).

### Como Ativar

```env
AUTH_ENABLED=true
AUTH_JWT_SECRET=um-secret-longo-e-aleatorio
AUTH_TOKEN_TTL=1h
```

### Rotas de Autenticação

#### POST `/auth/login`

```bash
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@example.com", "password": "admin123"}'
```

Resposta:

```json
{
  "token": "<jwt>",
  "user": {
    "sub": "1",
    "name": "Admin",
    "role": "admin",
    "scopes": ["*:*"]
  }
}
```

> Rate limiting: máximo de **10 tentativas por IP a cada 15 minutos**. Após atingir o limite, a resposta é `429 Too Many Requests` com o header `Retry-After`.

#### POST `/auth/refresh`

Renova um token válido (não-expirado). Aceita o token via header `Authorization: Bearer` ou campo `token` no body.

```bash
curl -X POST http://localhost:8000/auth/refresh \
  -H "Authorization: Bearer <token>"
```

> A assinatura do token é **verificada** antes da renovação. Tokens forjados ou expirados são rejeitados com `401`.

#### Uso do Token em Recursos

```bash
TOKEN="<token-obtido-no-login>"
curl http://localhost:8000/posts -H "Authorization: Bearer $TOKEN"
```

### Estrutura do `db.json` com Autenticação

As senhas devem ser armazenadas como **hashes bcrypt**. Nunca salve senhas em texto plano.

```json
{
  "users": [
    {
      "id": 1,
      "email": "admin@example.com",
      "name": "Admin",
      "password": "$2b$10$hash-bcrypt-aqui",
      "role": "admin",
      "scopes": ["*:*"]
    },
    {
      "id": 2,
      "email": "alice@example.com",
      "name": "Alice",
      "password": "$2b$10$hash-bcrypt-aqui",
      "role": "user",
      "scopes": ["read:*"]
    }
  ],
  "posts": []
}
```

Para gerar um hash bcrypt de uma nova senha:

```bash
node -e "const b=require('bcryptjs'); console.log(b.hashSync('minha-senha', 10));"
```

### Política de Escopos (CRUD)

| Escopo | Método permitido |
|--------|-----------------|
| `read:<resource>` | `GET /:resource` e `GET /:resource/:id` |
| `create:<resource>` | `POST /:resource` |
| `update:<resource>` | `PUT` e `PATCH /:resource/:id` |
| `delete:<resource>` | `DELETE /:resource/:id` |

#### Curingas

| Escopo | Acesso |
|--------|--------|
| `read:*` | Leitura de todos os recursos |
| `create:*` | Criação em todos os recursos |
| `*:*` | Acesso total (admin) |

---

## Validações

| Validação | Regra |
|-----------|-------|
| **JSON** | Body obrigatório em `POST`, `PUT` e `PATCH` de recursos |
| **ID** | Número positivo ou formato `p001`, `p123`, etc. |
| **Paginação** | `_page >= 1`, `1 <= _limit <= 100` |

Exemplo de erro:

```json
{
  "error": "Bad Request",
  "message": "Invalid ID parameter. ID must be a positive number or start with \"p\" followed by numbers (e.g., p001)."
}
```

---

## Logs

```
[2024-01-01T00:00:00.000Z] POST /auth/login - Started
[2024-01-01T00:00:00.000Z] 🟢 POST /auth/login -> 200 (66ms)
[2024-01-01T00:00:00.000Z] 🔴 POST /auth/login -> 401 (55ms)
[2024-01-01T00:00:00.000Z] 💚 GET /health -> 200 (5ms)
```

---

## Interface Web

Acesse **http://localhost:8000** para:

- Visualizar recursos disponíveis
- Criar, editar e remover itens
- Buscar e paginar resultados
- Visualizar metadados
- Monitorar a saúde da aplicação

---

## Desenvolvimento

### Criando Novos Recursos

```bash
# Com AUTH_ENABLED=false:
curl -X POST http://localhost:8000/_ensure/products \
  -H "Content-Type: application/json" \
  -d '{"name": "Produto Teste", "price": 29.99}'

# Depois disso, o endpoint /products estará disponível:
curl http://localhost:8000/products
```

### Resetando o Banco

```bash
# Via script npm:
npm run reset

# Ou via HTTP (requer escopo delete:* se AUTH_ENABLED=true):
curl -X POST http://localhost:8000/_reset
```

---

## Roadmap

- [x] Health checks e monitoramento
- [x] Autenticação e autorização (mock JWT)
- [x] Senhas com hash bcrypt
- [x] Rate limiting no login
- [x] Proteção contra prototype pollution
- [x] Refresh token seguro (verifica assinatura)
- [ ] Testes automatizados
- [ ] Documentação OpenAPI/Swagger
- [ ] Docker e containerização
- [ ] Cache com Redis
- [ ] Suporte a relacionamentos
- [ ] Backup automático
- [ ] CI/CD pipeline

---

## Contribuindo

1. **Fork** o projeto
2. Crie uma branch (`git checkout -b feature/minha-feature`)
3. Commit (`git commit -m 'feat: adiciona minha feature'`)
4. Push (`git push origin feature/minha-feature`)
5. Abra um Pull Request

---

## Licença

Licença **MIT** — veja [LICENSE](LICENSE).

---

## Suporte

- Issues: [GitHub Issues](https://github.com/samuelikz/fakeapi/issues)
- Docs: http://localhost:8000/_docs
- Health: http://localhost:8000/health

---

**Desenvolvido por Samuel** — [github.com/samuelikz](https://github.com/samuelikz)
=======
﻿# 🚀 Fake API - Servidor RESTful

Uma API RESTful completa e flexível construída com Node.js e Express, seguindo princípios de arquitetura limpa e separação de responsabilidades.

## ✨ Características

- **Arquitetura Limpa**: Separação clara de responsabilidades
- **CRUD Dinâmico**: Criação automática de endpoints para qualquer recurso
- **Validação Robusta**: Middlewares de validação para dados de entrada
- **Paginação Inteligente**: Sistema de paginação com limites configuráveis
- **Busca Textual**: Filtros de busca em todos os campos
- **Logging Avançado**: Sistema de logs com timestamps e cores
- **CORS Configurável**: Middleware CORS personalizável
- **Tratamento de Erros**: Sistema robusto de tratamento de erros
- **Interface Web**: Interface gráfica para gerenciar recursos
- **Health Checks**: Sistema completo de monitoramento de saúde
- **Autenticação Mock JWT**: Login fake com tokens, roles e scopes

---

## 🏗️ Arquitetura do Projeto

Abaixo a explicação dos diretórios e arquivos em formato de **tabela resumida**:

| Caminho | Arquivo | Função Principal |
|---------|---------|------------------|
| **src/auth/** | `crud-policy.js` | Define escopos de CRUD (`create/read/update/delete`) baseados no recurso |
| | `guard.js` | Middleware de autorização: verifica se o usuário tem o scope necessário |
| | `jwt.js` | Utilitário para criar e validar tokens JWT |
| | `mw-auth.js` | Middleware opcional que popula `req.user` com dados do token |
| | `user-store-file.js` | Lê os usuários do arquivo `db.json` (mock de autenticação) |
| **src/config/** | `app.js` | Configurações globais da aplicação (porta, env, etc.) |
| | `database.js` | Configurações do banco JSON (caminho e coleções padrão) |
| **src/controllers/** | `healthController.js` | Endpoints de health check e monitoramento |
| | `resourceController.js` | CRUD dinâmico para qualquer recurso (posts, users, etc.) |
| | `systemController.js` | Endpoints internos do sistema (`/_reset`, `/__resources`, etc.) |
| **src/middleware/** | `cors.js` | Middleware para configuração de CORS |
| | `logger.js` | Middleware de logging com timestamps e cores |
| | `validation.js` | Middlewares para validação de JSON, ID e paginação |
| **src/routes/** | `auth.routes.js` | Rotas de autenticação (`/auth/login`, `/auth/refresh`) |
| | `healthRoutes.js` | Rotas de health check (`/health`, `/health/ping`, etc.) |
| | `resourceRoutes.js` | Rotas CRUD dinâmicas para qualquer recurso |
| | `systemRoutes.js` | Rotas internas de sistema (`/_docs`, `/__resources`, etc.) |
| **src/services/** | `databaseService.js` | Serviço que manipula os dados do `db.json` |
| **src/utils/** | `fileUtils.js` | Funções auxiliares para manipulação de arquivos |
| **src/** | `server.js` | Arquivo principal que inicializa o servidor Express |

## 🚀 Instalação e Uso

### Pré-requisitos
- Node.js 14+
- npm ou yarn
---
### Instalação
```bash
git clone https://github.com/samuelikz/fakeapi.git
cd fakeapi
npm install
cp env.example .env   # Edite o arquivo .env conforme necessário
npm run dev
```

# 📜 Scripts Disponíveis

- `npm run dev`  
  Inicia em modo desenvolvimento com **nodemon**.

- `npm start`  
  Inicia em modo **produção**.

- `npm run reset`  
  Reseta o banco de dados para o estado inicial.

- `npm run seed:users` *(opcional)*  
  Cria usuários de exemplo no **db.json**.

# 💚 Health Checks e Monitoramento

## 📌 Endpoints

| Método | Endpoint          | Descrição            |
|--------|-------------------|----------------------|
| GET    | `/health`         | Health check básico  |
| GET    | `/health/detailed`| Health detalhado     |
| GET    | `/health/ping`    | Ping simples         |
| GET    | `/health/ready`   | Readiness check      |
| GET    | `/health/live`    | Liveness check       |
| GET    | `/_health`        | Alternativo/legacy   |

---

## 🧪 Exemplos

```bash
curl http://localhost:8000/health
curl http://localhost:8000/health/detailed
```
# 📚 API Endpoints

## 🔗 Endpoints do Sistema

| Método | Endpoint              | Descrição                          |
|--------|-----------------------|------------------------------------|
| GET    | `/__resources`        | Lista recursos disponíveis com contagem |
| GET    | `/_docs`              | Documentação da API                |
| POST   | `/_ensure/:resource`  | Cria recurso se não existir        |
| POST   | `/_reset`             | Reseta o banco de dados            |

---

## 🛠️ Endpoints CRUD Dinâmicos

Para qualquer recurso (ex.: `posts`, `users`, `products`):

| Método | Endpoint            | Descrição             |
|--------|---------------------|-----------------------|
| GET    | `/:resource`        | Lista itens           |
| GET    | `/:resource/:id`    | Obtém item específico |
| POST   | `/:resource`        | Cria novo item        |
| PUT    | `/:resource/:id`    | Atualiza totalmente   |
| PATCH  | `/:resource/:id`    | Atualiza parcialmente |
| DELETE | `/:resource/:id`    | Remove item           |
---
# 🔐 Autenticação Mock JWT

Este projeto possui suporte **opcional** a autenticação JWT mockável, ideal para protótipos e testes de front-end com **guards, roles e scopes**.  
⚠️ **Atenção**: Não use em produção sem implementar segurança real.

---

## ⚙️ Como Ativar

```env
AUTH_ENABLED=true          # se false, a API funciona sem exigir token
AUTH_JWT_SECRET=uma_senha_bem_grande_e_secreta
AUTH_TOKEN_TTL=1h
```

# 🗂️ Estrutura mínima do `db.json`

```json
{
  "users": [
    {
      "id": 1,
      "email": "admin@example.com",
      "name": "Admin",
      "password": "admin123",
      "role": "admin",
      "scopes": ["*:*"]
    },
    {
      "id": 2,
      "email": "alice@example.com",
      "name": "Alice",
      "password": "alice",
      "role": "user",
      "scopes": ["read:*"]
    }
  ],
  "posts": []
}

```

# 🔑 Rotas de Autenticação

## 🔐 Login

- **POST** `/auth/login`  
  **Body:**  
  ```json
  { "email": "string", "password": "string" }
  "retorno",
  { "token": "jwt", "user": { "..." } }
  ```

  # 🔄 Refresh Token

- **POST** `/auth/refresh`  
  **Body:**  
  ```json
  { "token": "jwt" }
  "retorno",
  { "token": "novo_jwt", "user": { "..." } }
  ```

## 🔐 Exemplos Rápidos

### Exemplo de Login
```bash
curl -sX POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'
```
### 🔑 Uso do Token
```bash
TOKEN="cole_aqui"
curl -s http://localhost:8000/posts -H "Authorization: Bearer $TOKEN"
```

## 📜 Política de Escopos (CRUD)

- `read:<resource>` → `GET /:resource`  
- `create:<resource>` → `POST /:resource`  
- `update:<resource>` → `PUT/PATCH /:resource/:id`  
- `delete:<resource>` → `DELETE /:resource/:id`  

### 🔑 Curingas
- `read:*` → leitura de todos os recursos  
- `*:*` → acesso total (**admin**)  

## 🔍 Parâmetros de Consulta

- `_page`: número da página (padrão: **1**)  
- `_limit`: itens por página (padrão: **50**, máximo: **100**)  
- `_meta`: incluir metadados de paginação (`0` ou `1`)  
- `q`: termo de busca textual em todos os campos  

### 📌 Exemplo
```http
GET /posts?q=node&_page=2&_limit=10&_meta=1
```
## ⚙️ Configuração

### 🔧 Variáveis de Ambiente
```env
NODE_ENV=development
PORT=8000

# Configurações do Banco de Dados
DB_PATH=./data/db.json

# Configurações CORS
CORS_ORIGIN=*

# Configurações de Autenticação
AUTH_ENABLED=true
AUTH_JWT_SECRET=uma_senha_bem_grande_e_secreta
AUTH_TOKEN_TTL=1h

#Dica: com AUTH_ENABLED=false, tudo volta a ficar sem login.
```
### 📂 Exemplo de Configuração do Banco (`src/config/database.js`)

```js
const DB_CONFIG = {
  path: './data/db.json',
  defaultCollections: ['posts', 'users'],
  maxItemsPerPage: 100,
  defaultPageSize: 50
};

module.exports = DB_CONFIG;
```
## 🛡️ Validações

- **JSON**: corpo válido  
- **ID**: número positivo  
- **Paginação**: parâmetros válidos  
- **CORS**: headers automáticos  

### ❌ Exemplo de erro
```json
{
  "error": "Bad Request",
  "message": "Invalid ID parameter. ID must be a positive number."
}
```

## 📊 Estrutura do Banco de Dados

```json
{
  "users": [
    {
      "id": 1,
      "email": "admin@example.com",
      "name": "Admin",
      "password": "admin123",
      "role": "admin",
      "scopes": ["*:*"]
    },
    {
      "id": 2,
      "email": "alice@example.com",
      "name": "Alice",
      "password": "alice",
      "role": "user",
      "scopes": ["read:*"]
    }
  ],
  "posts": [
    {
      "id": 1,
      "title": "Meu Post",
      "content": "Conteúdo do post",
      "author": "João",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```
## 🔧 Desenvolvimento

### Criando Novos Recursos
```http
POST /_ensure/products
Content-Type: application/json

{ "name": "Produto Teste", "price": 29.99 }

GET /products
POST /products
GET /products/1
PUT /products/1
PATCH /products/1
DELETE /products/1

```
## 📑 Estrutura de Logs

```bash
[2024-01-01T00:00:00.000Z] GET /posts - Started
[2024-01-01T00:00:00.000Z] 🟢 GET /posts -> 200 (15ms)
[2024-01-01T00:00:00.000Z] 🔴 POST /posts -> 400 (8ms)
[2024-01-01T00:00:00.000Z] 💚 GET /health -> 200 (5ms)
```

---

## 🌐 Interface Web

Acesse **http://localhost:8000** para:

- Visualizar recursos disponíveis  
- Criar, editar e remover itens  
- Buscar e paginar resultados  
- Visualizar metadados  
- Monitorar a saúde da aplicação  

---

## 📝 Contribuindo

1. **Fork** o projeto  
2. Crie uma branch (`git checkout -b feature/minha-feature`)  
3. Commit (`git commit -m 'feat: adiciona minha feature'`)  
4. Push (`git push origin feature/minha-feature`)  
5. Abra um Pull Request  

### Diretrizes

- Código limpo e bem documentado  
- Siga os padrões existentes  
- Adicione testes quando possível  
- Atualize a documentação  
- Use commits descritivos e claros  

## 📄 Licença

Licença **MIT** – veja [LICENSE](LICENSE).

- ✅ Usar, modificar, distribuir, uso comercial, sublicenciar  
- ❌ Manter copyright  
- 🛡️ Sem garantias (software “como está”)  

---

## 🤝 Suporte

- Issues: [GitHub Issues](https://github.com/samuelikz/fakeapi/issues)  
- Docs: [http://localhost:8000/_docs](http://localhost:8000/_docs)  
- Web: [http://localhost:8000](http://localhost:8000)  
- Health: [http://localhost:8000/health](http://localhost:8000/health)  
- Discussões: [GitHub Discussions](https://github.com/samuelikz/fakeapi/discussions)  

---

## 🎯 Roadmap

- [x] Health checks e monitoramento  
- [x] Autenticação e autorização (mock JWT)  
- [ ] Rate limiting  
- [ ] Cache com Redis  
- [ ] Testes automatizados  
- [ ] Documentação OpenAPI/Swagger  
- [ ] Suporte a relacionamentos  
- [ ] Backup automático  
- [ ] Métricas e monitoramento  
- [ ] Docker e containerização  
- [ ] CI/CD pipeline  

---

## 🙏 Agradecimentos

- **Express.js**  
- **Nodemon**  
- **Comunidade Node.js**  
- **Contribuidores**  

---

**Desenvolvido com ❤️ por Samuel**  
*Este projeto é mantido como software livre sob a Licença MIT. Contribuições são sempre bem-vindas!*  


>>>>>>> 3214833aa1adf06f8d18c37b49f1d4571f951a4b
