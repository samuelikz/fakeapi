<template>
  <section class="section" id="endpoints">
    <div class="container">
      <p class="section__label">referência</p>
      <h2 class="section__title">Endpoints</h2>
      <p class="section__desc">
        Todos os endpoints disponíveis. Clique em "curl" para copiar o comando pronto.
      </p>

      <div v-for="group in endpointGroups" :key="group.title" class="ep-group">
        <h3 class="ep-group__title">{{ group.title }}</h3>
        <div class="ep-table">
          <div
            v-for="ep in group.endpoints"
            :key="ep.method + ep.path"
            class="ep-row"
          >
            <span class="ep-method" :class="`ep-method--${ep.method.toLowerCase()}`">
              {{ ep.method }}
            </span>
            <code class="ep-path">{{ ep.path }}</code>
            <span class="ep-desc">{{ ep.desc }}</span>
            <button
              class="ep-copy"
              @click="copyCurl(ep)"
              :aria-label="'Copiar curl para ' + ep.path"
              aria-live="polite"
            >
              {{ copiedKey === ep.method + ep.path ? 'Copiado!' : 'curl' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const BASE = 'https://fakeapi.aioher.com'
const copiedKey = ref(null)

const endpointGroups = [
  {
    title: 'Recursos (CRUD dinâmico)',
    endpoints: [
      { method: 'GET',    path: '/:resource',     desc: 'Lista itens (suporta ?q=, ?_page=, ?_limit=, ?_meta=1)' },
      { method: 'GET',    path: '/:resource/:id',  desc: 'Obtém item específico pelo ID' },
      { method: 'POST',   path: '/:resource',      desc: 'Cria novo item (body JSON)' },
      { method: 'PUT',    path: '/:resource/:id',  desc: 'Substitui item completamente (body JSON)' },
      { method: 'PATCH',  path: '/:resource/:id',  desc: 'Atualiza campos parcialmente (body JSON)' },
      { method: 'DELETE', path: '/:resource/:id',  desc: 'Remove item pelo ID' },
    ]
  },
  {
    title: 'Autenticação',
    endpoints: [
      { method: 'POST', path: '/auth/login',   desc: 'Login fake — retorna JWT. Body: { username, password }' },
      { method: 'POST', path: '/auth/refresh', desc: 'Renova token JWT (mock)' },
    ]
  },
  {
    title: 'Sistema',
    endpoints: [
      { method: 'GET',  path: '/__resources',        desc: 'Lista todos os recursos com contagem de itens' },
      { method: 'GET',  path: '/_docs',              desc: 'Documentação em texto plano' },
      { method: 'POST', path: '/_ensure/:resource',  desc: 'Cria recurso se não existir' },
      { method: 'POST', path: '/_reset',             desc: 'Reseta o banco de dados para o estado inicial' },
    ]
  },
  {
    title: 'Health Checks',
    endpoints: [
      { method: 'GET', path: '/health',          desc: 'Health check básico' },
      { method: 'GET', path: '/health/detailed', desc: 'Health check com detalhes do sistema' },
      { method: 'GET', path: '/health/ping',     desc: 'Ping simples para load balancers' },
      { method: 'GET', path: '/health/ready',    desc: 'Readiness check (Kubernetes)' },
      { method: 'GET', path: '/health/live',     desc: 'Liveness check (Kubernetes)' },
    ]
  }
]

const curlTemplates = {
  GET:    (path) => `curl ${BASE}${path.replace('/:resource', '/posts').replace('/:id', '/1')}`,
  POST:   (path) => {
    if (path === '/auth/login')
      return `curl -X POST ${BASE}/auth/login -H "Content-Type: application/json" -d '{"username":"admin","password":"admin"}'`
    if (path === '/auth/refresh')
      return `curl -X POST ${BASE}/auth/refresh -H "Authorization: Bearer <token>"`
    const ep = path.replace('/:resource', '/posts').replace('/_ensure/:resource', '/_ensure/posts')
    return `curl -X POST ${BASE}${ep} -H "Content-Type: application/json" -d '{"title":"Novo item"}'`
  },
  PUT:    (path) => `curl -X PUT ${BASE}${path.replace('/:resource', '/posts').replace('/:id', '/1')} -H "Content-Type: application/json" -d '{"title":"Atualizado"}'`,
  PATCH:  (path) => `curl -X PATCH ${BASE}${path.replace('/:resource', '/posts').replace('/:id', '/1')} -H "Content-Type: application/json" -d '{"title":"Parcial"}'`,
  DELETE: (path) => `curl -X DELETE ${BASE}${path.replace('/:resource', '/posts').replace('/:id', '/1')}`,
}

function copyCurl(ep) {
  const fn = curlTemplates[ep.method]
  const text = fn ? fn(ep.path) : `curl ${BASE}${ep.path}`
  navigator.clipboard.writeText(text).then(() => {
    copiedKey.value = ep.method + ep.path
    setTimeout(() => { copiedKey.value = null }, 1500)
  }).catch(() => {
    console.warn('Clipboard write failed')
  })
}
</script>

<style scoped>
.ep-group {
  margin-bottom: 36px;
}

.ep-group__title {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-family: var(--font-mono);
  margin-bottom: 12px;
}

.ep-table {
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.ep-row {
  display: grid;
  grid-template-columns: 72px 220px 1fr 64px;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border);
  transition: background 0.1s;
}

.ep-row:last-child {
  border-bottom: none;
}

.ep-row:hover {
  background: var(--bg-card);
}

/* Method badges */
.ep-method {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
  text-align: center;
  padding: 3px 8px;
  border-radius: 4px;
  letter-spacing: 0.05em;
  width: fit-content;
}

.ep-method--get    { background: rgba(59,130,246,0.15); color: #60a5fa; border: 1px solid rgba(59,130,246,0.25); }
.ep-method--post   { background: rgba(0,255,136,0.12);  color: var(--green); border: 1px solid rgba(0,255,136,0.2); }
.ep-method--put    { background: rgba(245,158,11,0.12); color: #fbbf24; border: 1px solid rgba(245,158,11,0.2); }
.ep-method--patch  { background: rgba(168,85,247,0.12); color: #c084fc; border: 1px solid rgba(168,85,247,0.2); }
.ep-method--delete { background: rgba(239,68,68,0.12);  color: #f87171; border: 1px solid rgba(239,68,68,0.2); }

.ep-path {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ep-desc {
  font-size: 13px;
  color: var(--text-muted);
}

.ep-copy {
  background: transparent;
  border: 1px solid var(--border-bright);
  border-radius: 4px;
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: 11px;
  padding: 3px 8px;
  cursor: pointer;
  transition: color 0.15s, border-color 0.15s;
  white-space: nowrap;
  justify-self: end;
}

.ep-copy:hover {
  color: var(--green);
  border-color: var(--green);
}

@media (max-width: 640px) {
  .ep-row {
    grid-template-columns: 60px 1fr 40px;
    grid-template-rows: auto auto;
  }
  .ep-path {
    white-space: normal;
    overflow-wrap: break-word;
    word-break: break-all;
  }
  .ep-desc {
    grid-column: 1 / -1;
    font-size: 12px;
  }
}
</style>
