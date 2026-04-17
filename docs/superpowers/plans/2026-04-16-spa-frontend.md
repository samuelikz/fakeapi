# SPA Frontend — fakeapi Showcase Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Criar uma SPA de vitrine em `frontend/` com Vue 3 + Vite para apresentar o projeto fakeapi a desenvolvedores, com seções Hero, Quick Start, Endpoints Reference e Health Badge ao vivo.

**Architecture:** SPA standalone em `frontend/` totalmente independente do backend. Sem vue-router (scroll suave para âncoras). CSS com custom properties puras, estilo dark/tech. Composable `useHealth.js` gerencia polling do endpoint `/health`.

**Tech Stack:** Vue 3 (Composition API), Vite 5, CSS custom properties, JetBrains Mono + Inter (Google Fonts)

---

## File Map

| Arquivo | Responsabilidade |
|---------|-----------------|
| `frontend/index.html` | Entry HTML, meta tags, Google Fonts |
| `frontend/package.json` | Dependências: vue, vite, @vitejs/plugin-vue |
| `frontend/vite.config.js` | Configuração do Vite |
| `frontend/public/logo.png` | Logo copiada de `public/logo.png` |
| `frontend/src/main.js` | Monta o app Vue |
| `frontend/src/App.vue` | Layout raiz + CSS custom properties globais |
| `frontend/src/components/NavBar.vue` | Navbar fixa com links âncora e health dot |
| `frontend/src/components/HeroSection.vue` | Hero com grid animado, CTAs, feature cards |
| `frontend/src/components/QuickStart.vue` | Terminal fake com 3 passos de instalação |
| `frontend/src/composables/useHealth.js` | Fetch + polling de `/health`, persiste URL no localStorage |
| `frontend/src/components/HealthBadge.vue` | Widget de status ao vivo usando useHealth |
| `frontend/src/components/EndpointsReference.vue` | Tabela de endpoints com copiar curl |

---

## Task 1: Scaffold do projeto

**Files:**
- Create: `frontend/package.json`
- Create: `frontend/vite.config.js`
- Create: `frontend/index.html`
- Create: `frontend/src/main.js`

- [ ] **Step 1: Criar `frontend/package.json`**

```json
{
  "name": "fakeapi-showcase",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "vue": "^3.4.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.0.0",
    "vite": "^5.0.0"
  }
}
```

- [ ] **Step 2: Criar `frontend/vite.config.js`**

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173
  }
})
```

- [ ] **Step 3: Criar `frontend/index.html`**

```html
<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>fakeapi — REST API para protótipos</title>
  <meta name="description" content="REST API para protótipos, testes e demos rápidas." />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/src/main.js"></script>
</body>
</html>
```

- [ ] **Step 4: Criar `frontend/src/main.js`**

```js
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```

- [ ] **Step 5: Copiar logo**

```bash
cp public/logo.png frontend/public/logo.png
```

- [ ] **Step 6: Instalar dependências e verificar que o projeto inicia**

```bash
cd frontend && npm install && npm run dev
```

Esperado: servidor Vite rodando em `http://localhost:5173` (página em branco — ainda sem App.vue).

- [ ] **Step 7: Commit**

```bash
cd ..
git add frontend/package.json frontend/vite.config.js frontend/index.html frontend/src/main.js frontend/public/logo.png
git commit -m "feat(frontend): scaffold Vue 3 + Vite project"
```

---

## Task 2: App.vue — layout raiz e CSS global

**Files:**
- Create: `frontend/src/App.vue`

- [ ] **Step 1: Criar `frontend/src/App.vue`**

```vue
<template>
  <div class="app">
    <NavBar />
    <main>
      <HeroSection id="hero" />
      <QuickStart id="quickstart" />
      <EndpointsReference id="endpoints" />
      <HealthBadge id="health" />
    </main>
    <footer class="footer">
      <div class="container footer__inner">
        <span>MIT © {{ year }} fakeapi</span>
        <div class="footer__links">
          <a href="https://github.com/samuelikz/fakeapi" target="_blank" rel="noopener">GitHub</a>
          <a href="https://fakeapi.aioher.com" target="_blank" rel="noopener">Demo ao vivo</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import QuickStart from './components/QuickStart.vue'
import EndpointsReference from './components/EndpointsReference.vue'
import HealthBadge from './components/HealthBadge.vue'

const year = new Date().getFullYear()
</script>

<style>
/* ===== CSS Custom Properties ===== */
:root {
  --bg: #0d0d0d;
  --bg-card: #141414;
  --bg-card-hover: #1a1a1a;
  --border: #1f1f1f;
  --border-bright: #2a2a2a;
  --text: #e2e2e2;
  --text-muted: #666;
  --text-dim: #999;
  --green: #00ff88;
  --green-dim: rgba(0, 255, 136, 0.12);
  --purple: #7c3aed;
  --purple-dim: rgba(124, 58, 237, 0.15);
  --blue: #3b82f6;
  --yellow: #f59e0b;
  --red: #ef4444;
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
  --radius: 8px;
  --radius-lg: 12px;
}

/* ===== Reset & Base ===== */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html { scroll-behavior: smooth; }

body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-sans);
  font-size: 16px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

a { color: var(--green); text-decoration: none; }
a:hover { text-decoration: underline; }

code, pre { font-family: var(--font-mono); }

/* ===== Layout helpers ===== */
.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 24px;
}

.section {
  padding: 80px 0;
}

.section__label {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--green);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 12px;
}

.section__title {
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  margin-bottom: 16px;
}

.section__desc {
  color: var(--text-dim);
  max-width: 560px;
  margin-bottom: 40px;
}

/* ===== Footer ===== */
.footer {
  border-top: 1px solid var(--border);
  padding: 32px 0;
}

.footer__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 14px;
  color: var(--text-muted);
}

.footer__links {
  display: flex;
  gap: 20px;
}

.footer__links a {
  color: var(--text-muted);
  font-size: 14px;
}

.footer__links a:hover {
  color: var(--text);
}
</style>
```

- [ ] **Step 2: Criar arquivos stub para os componentes (para o app compilar)**

Criar `frontend/src/components/NavBar.vue`:
```vue
<template><nav></nav></template>
```

Criar `frontend/src/components/HeroSection.vue`:
```vue
<template><section></section></template>
```

Criar `frontend/src/components/QuickStart.vue`:
```vue
<template><section></section></template>
```

Criar `frontend/src/components/EndpointsReference.vue`:
```vue
<template><section></section></template>
```

Criar `frontend/src/components/HealthBadge.vue`:
```vue
<template><section></section></template>
```

Criar `frontend/src/composables/useHealth.js`:
```js
export function useHealth() {}
```

- [ ] **Step 3: Verificar que o app compila sem erros**

```bash
cd frontend && npm run dev
```

Esperado: página preta sem erros no console.

- [ ] **Step 4: Commit**

```bash
cd ..
git add frontend/src/
git commit -m "feat(frontend): add App.vue with global CSS and component stubs"
```

---

## Task 3: NavBar.vue

**Files:**
- Modify: `frontend/src/components/NavBar.vue`

- [ ] **Step 1: Implementar `frontend/src/components/NavBar.vue`**

```vue
<template>
  <nav class="navbar">
    <div class="container navbar__inner">
      <a href="#hero" class="navbar__brand">
        <img src="/logo.png" alt="fakeapi" class="navbar__logo" />
        <span class="navbar__name">fakeapi</span>
      </a>
      <div class="navbar__links">
        <a href="#quickstart">Quick Start</a>
        <a href="#endpoints">Endpoints</a>
        <a href="#health">Health</a>
        <a
          href="https://github.com/samuelikz/fakeapi"
          target="_blank"
          rel="noopener"
          class="navbar__github"
        >GitHub</a>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(13, 13, 13, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
}

.navbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
}

.navbar__brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}

.navbar__logo {
  width: 28px;
  height: 28px;
  object-fit: contain;
  border-radius: 6px;
}

.navbar__name {
  font-family: var(--font-mono);
  font-size: 15px;
  font-weight: 500;
  color: var(--text);
}

.navbar__links {
  display: flex;
  align-items: center;
  gap: 24px;
}

.navbar__links a {
  font-size: 14px;
  color: var(--text-dim);
  text-decoration: none;
  transition: color 0.15s;
}

.navbar__links a:hover {
  color: var(--text);
  text-decoration: none;
}

.navbar__github {
  font-family: var(--font-mono);
  font-size: 13px !important;
  color: var(--green) !important;
  border: 1px solid rgba(0, 255, 136, 0.3);
  border-radius: var(--radius);
  padding: 5px 12px;
  transition: background 0.15s !important;
}

.navbar__github:hover {
  background: var(--green-dim);
}
</style>
```

- [ ] **Step 2: Verificar navbar visualmente**

```bash
cd frontend && npm run dev
```

Esperado: navbar fixa no topo com logo, links e botão GitHub em verde.

- [ ] **Step 3: Commit**

```bash
cd ..
git add frontend/src/components/NavBar.vue
git commit -m "feat(frontend): implement NavBar with fixed positioning and GitHub CTA"
```

---

## Task 4: HeroSection.vue

**Files:**
- Modify: `frontend/src/components/HeroSection.vue`

- [ ] **Step 1: Implementar `frontend/src/components/HeroSection.vue`**

```vue
<template>
  <section class="hero section" id="hero">
    <div class="hero__grid" aria-hidden="true"></div>
    <div class="container hero__content">
      <p class="section__label">open source · MIT · Node.js</p>
      <h1 class="hero__title">
        <span class="hero__title-main">fakeapi</span>
        <span class="hero__title-cursor">_</span>
      </h1>
      <p class="hero__tagline">
        REST API para protótipos, testes e demos rápidas.<br />
        CRUD dinâmico, JWT auth, zero configuração.
      </p>
      <div class="hero__actions">
        <a
          href="https://github.com/samuelikz/fakeapi"
          target="_blank"
          rel="noopener"
          class="btn btn--primary"
        >
          GitHub
        </a>
        <a href="#quickstart" class="btn btn--secondary">Quick Start →</a>
      </div>
      <div class="hero__features">
        <div class="feature-card">
          <span class="feature-card__icon">⚡</span>
          <h3>CRUD Dinâmico</h3>
          <p>Qualquer recurso via <code>/:resource</code> sem configuração prévia.</p>
        </div>
        <div class="feature-card">
          <span class="feature-card__icon">🔐</span>
          <h3>JWT Auth</h3>
          <p>Login fake com tokens JWT reais. Proteção de rotas com escopos.</p>
        </div>
        <div class="feature-card">
          <span class="feature-card__icon">🚀</span>
          <h3>Zero Config</h3>
          <p>Clone, instale e rode. Dados persistidos em JSON local.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  padding-top: 140px;
  padding-bottom: 80px;
  overflow: hidden;
}

/* Grid de fundo animado */
.hero__grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(124, 58, 237, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(124, 58, 237, 0.06) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%);
  pointer-events: none;
}

.hero__content {
  position: relative;
  z-index: 1;
}

.hero__title {
  font-size: clamp(3rem, 8vw, 5.5rem);
  font-family: var(--font-mono);
  font-weight: 700;
  line-height: 1;
  margin-bottom: 20px;
  letter-spacing: -0.02em;
}

.hero__title-main {
  background: linear-gradient(135deg, #fff 30%, var(--purple) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero__title-cursor {
  color: var(--green);
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.hero__tagline {
  font-size: clamp(1rem, 2vw, 1.15rem);
  color: var(--text-dim);
  margin-bottom: 36px;
  line-height: 1.7;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 60px;
}

.btn {
  display: inline-flex;
  align-items: center;
  padding: 10px 22px;
  border-radius: var(--radius);
  font-size: 15px;
  font-weight: 500;
  text-decoration: none;
  transition: opacity 0.15s, background 0.15s;
}

.btn--primary {
  background: var(--purple);
  color: #fff;
  border: 1px solid var(--purple);
}

.btn--primary:hover {
  opacity: 0.85;
  text-decoration: none;
}

.btn--secondary {
  background: transparent;
  color: var(--text);
  border: 1px solid var(--border-bright);
}

.btn--secondary:hover {
  background: var(--bg-card-hover);
  text-decoration: none;
}

/* Feature cards */
.hero__features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}

.feature-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 24px;
  transition: border-color 0.15s, background 0.15s;
}

.feature-card:hover {
  border-color: var(--border-bright);
  background: var(--bg-card-hover);
}

.feature-card__icon {
  font-size: 24px;
  display: block;
  margin-bottom: 12px;
}

.feature-card h3 {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 8px;
}

.feature-card p {
  font-size: 13px;
  color: var(--text-dim);
  line-height: 1.6;
}

.feature-card code {
  font-size: 12px;
  color: var(--green);
  background: var(--green-dim);
  padding: 1px 5px;
  border-radius: 4px;
}
</style>
```

- [ ] **Step 2: Verificar hero visualmente**

```bash
cd frontend && npm run dev
```

Esperado: título grande "fakeapi_" com cursor piscando, grid roxo de fundo, 3 feature cards.

- [ ] **Step 3: Commit**

```bash
cd ..
git add frontend/src/components/HeroSection.vue
git commit -m "feat(frontend): implement HeroSection with animated grid and feature cards"
```

---

## Task 5: QuickStart.vue

**Files:**
- Modify: `frontend/src/components/QuickStart.vue`

- [ ] **Step 1: Implementar `frontend/src/components/QuickStart.vue`**

```vue
<template>
  <section class="section" id="quickstart">
    <div class="container">
      <p class="section__label">instalação</p>
      <h2 class="section__title">Quick Start</h2>
      <p class="section__desc">
        Rode localmente em menos de um minuto. Requer Node.js 14+.
      </p>

      <div class="terminal">
        <div class="terminal__bar">
          <span class="dot dot--red"></span>
          <span class="dot dot--yellow"></span>
          <span class="dot dot--green"></span>
          <span class="terminal__title">bash</span>
        </div>
        <div class="terminal__body">
          <div v-for="(step, i) in steps" :key="i" class="terminal__step">
            <span class="terminal__comment"># {{ step.comment }}</span>
            <div v-for="(line, j) in step.lines" :key="j" class="terminal__line">
              <span class="terminal__prompt">$</span>
              <span class="terminal__cmd">{{ line }}</span>
              <button
                class="terminal__copy"
                @click="copy(line, i + '-' + j)"
                :aria-label="'Copiar: ' + line"
              >
                {{ copied === i + '-' + j ? 'Copiado!' : 'Copiar' }}
              </button>
            </div>
          </div>
          <div class="terminal__output">
            <span class="terminal__green">🚀 Fake API Server running on http://localhost:3000</span><br />
            <span class="terminal__green">📚 Documentation available at http://localhost:3000/_docs</span><br />
            <span class="terminal__green">🌐 Web interface available at http://localhost:3000</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const copied = ref(null)

const steps = [
  {
    comment: '1. Clone o repositório',
    lines: ['git clone https://github.com/samuelikz/fakeapi.git']
  },
  {
    comment: '2. Instale as dependências',
    lines: ['cd fakeapi', 'npm install']
  },
  {
    comment: '3. Inicie o servidor',
    lines: ['npm run dev']
  }
]

function copy(text, id) {
  navigator.clipboard.writeText(text).then(() => {
    copied.value = id
    setTimeout(() => { copied.value = null }, 1500)
  })
}
</script>

<style scoped>
.terminal {
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-bright);
  overflow: hidden;
  font-family: var(--font-mono);
  font-size: 13px;
  max-width: 680px;
}

.terminal__bar {
  background: #1a1a1a;
  border-bottom: 1px solid var(--border);
  padding: 10px 14px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}
.dot--red    { background: #ff5f56; }
.dot--yellow { background: #ffbd2e; }
.dot--green  { background: #27c93f; }

.terminal__title {
  margin-left: 8px;
  font-size: 12px;
  color: var(--text-muted);
}

.terminal__body {
  background: #111;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.terminal__step {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.terminal__comment {
  color: #4a5568;
  font-size: 12px;
}

.terminal__line {
  display: flex;
  align-items: center;
  gap: 8px;
}

.terminal__prompt {
  color: var(--green);
  user-select: none;
}

.terminal__cmd {
  color: var(--text);
  flex: 1;
}

.terminal__copy {
  background: transparent;
  border: 1px solid var(--border-bright);
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: color 0.15s, border-color 0.15s;
  white-space: nowrap;
}

.terminal__copy:hover {
  color: var(--text);
  border-color: var(--green);
}

.terminal__output {
  color: var(--text-muted);
  font-size: 12px;
  line-height: 1.8;
  padding-top: 4px;
  border-top: 1px solid var(--border);
}

.terminal__green {
  color: #27c93f;
}
</style>
```

- [ ] **Step 2: Verificar o terminal fake visualmente**

```bash
cd frontend && npm run dev
```

Esperado: terminal escuro com 3 passos, botões "Copiar" por linha, output verde de resultado.

- [ ] **Step 3: Commit**

```bash
cd ..
git add frontend/src/components/QuickStart.vue
git commit -m "feat(frontend): implement QuickStart terminal with copy-per-line"
```

---

## Task 6: useHealth.js composable

**Files:**
- Modify: `frontend/src/composables/useHealth.js`

- [ ] **Step 1: Implementar `frontend/src/composables/useHealth.js`**

```js
import { ref, onMounted, onUnmounted } from 'vue'

const DEFAULT_URL = 'https://fakeapi.aioher.com'
const POLL_INTERVAL = 30_000

export function useHealth(baseUrlRef) {
  const status = ref('loading')   // 'loading' | 'online' | 'offline'
  const latency = ref(null)       // number (ms) | null
  const lastChecked = ref(null)   // Date | null
  const error = ref(null)

  let timer = null

  async function check() {
    const base = (baseUrlRef?.value || DEFAULT_URL).replace(/\/$/, '')
    status.value = 'loading'
    error.value = null

    const start = performance.now()
    try {
      const res = await fetch(`${base}/health`, {
        signal: AbortSignal.timeout(5000),
        headers: { Accept: 'application/json' }
      })
      latency.value = Math.round(performance.now() - start)
      lastChecked.value = new Date()
      status.value = res.ok ? 'online' : 'offline'
      if (!res.ok) error.value = `HTTP ${res.status}`
    } catch (e) {
      latency.value = null
      lastChecked.value = new Date()
      status.value = 'offline'
      error.value = e.name === 'TimeoutError' ? 'Timeout (5s)' : 'Sem resposta'
    }
  }

  function startPolling() {
    check()
    timer = setInterval(check, POLL_INTERVAL)
  }

  function stopPolling() {
    clearInterval(timer)
  }

  onMounted(startPolling)
  onUnmounted(stopPolling)

  return { status, latency, lastChecked, error, check }
}
```

- [ ] **Step 2: Commit**

```bash
git add frontend/src/composables/useHealth.js
git commit -m "feat(frontend): add useHealth composable with 30s polling"
```

---

## Task 7: HealthBadge.vue

**Files:**
- Modify: `frontend/src/components/HealthBadge.vue`

- [ ] **Step 1: Implementar `frontend/src/components/HealthBadge.vue`**

```vue
<template>
  <section class="section" id="health">
    <div class="container">
      <p class="section__label">monitoramento</p>
      <h2 class="section__title">Health Check ao Vivo</h2>
      <p class="section__desc">
        Verifique o status da API em tempo real. Troque a URL para testar sua instância local.
      </p>

      <div class="health-card">
        <div class="health-card__url-row">
          <label for="healthUrl" class="health-card__label">URL da API</label>
          <div class="health-card__input-group">
            <input
              id="healthUrl"
              v-model="inputUrl"
              @change="saveUrl"
              @keyup.enter="saveUrl"
              class="health-card__input"
              placeholder="https://fakeapi.aioher.com"
              spellcheck="false"
            />
            <button class="health-card__refresh" @click="health.check()">
              Verificar
            </button>
          </div>
        </div>

        <div class="health-card__status-row">
          <div class="health-indicator" :class="`health-indicator--${health.status.value}`">
            <span class="health-indicator__dot"></span>
            <span class="health-indicator__text">{{ statusLabel }}</span>
          </div>

          <div v-if="health.latency.value !== null" class="health-card__latency">
            <span class="health-card__latency-value">{{ health.latency.value }}</span>
            <span class="health-card__latency-unit">ms</span>
          </div>
        </div>

        <div class="health-card__meta">
          <span v-if="health.lastChecked.value">
            Última verificação: {{ formatTime(health.lastChecked.value) }}
          </span>
          <span v-if="health.error.value" class="health-card__error">
            {{ health.error.value }}
          </span>
          <span class="health-card__poll-note">Polling a cada 30s</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useHealth } from '../composables/useHealth.js'

const STORAGE_KEY = 'fakeapi_health_url'

const inputUrl = ref(localStorage.getItem(STORAGE_KEY) || 'https://fakeapi.aioher.com')
const baseUrl = ref(inputUrl.value)

const health = useHealth(baseUrl)

function saveUrl() {
  baseUrl.value = inputUrl.value.trim().replace(/\/$/, '') || 'https://fakeapi.aioher.com'
  localStorage.setItem(STORAGE_KEY, baseUrl.value)
  health.check()
}

const statusLabel = computed(() => ({
  loading: 'Verificando…',
  online:  'Online',
  offline: 'Offline'
}[health.status.value] || 'Desconhecido'))

function formatTime(date) {
  return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}
</script>

<style scoped>
.health-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 28px;
  max-width: 560px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.health-card__url-row {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.health-card__label {
  font-size: 12px;
  color: var(--text-muted);
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.health-card__input-group {
  display: flex;
  gap: 8px;
}

.health-card__input {
  flex: 1;
  background: var(--bg);
  border: 1px solid var(--border-bright);
  border-radius: var(--radius);
  color: var(--text);
  font-family: var(--font-mono);
  font-size: 13px;
  padding: 8px 12px;
  outline: none;
  transition: border-color 0.15s;
}

.health-card__input:focus {
  border-color: var(--purple);
}

.health-card__refresh {
  background: var(--bg);
  border: 1px solid var(--border-bright);
  border-radius: var(--radius);
  color: var(--text-dim);
  font-size: 13px;
  padding: 8px 14px;
  cursor: pointer;
  transition: color 0.15s, border-color 0.15s;
  white-space: nowrap;
}

.health-card__refresh:hover {
  color: var(--text);
  border-color: var(--green);
}

.health-card__status-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

/* Health indicator */
.health-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
}

.health-indicator__dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.health-indicator--loading .health-indicator__dot {
  background: var(--text-muted);
  animation: pulse-dot 1s ease-in-out infinite;
}

.health-indicator--online .health-indicator__dot {
  background: var(--green);
  box-shadow: 0 0 6px rgba(0, 255, 136, 0.5);
}

.health-indicator--offline .health-indicator__dot {
  background: var(--red);
  box-shadow: 0 0 6px rgba(239, 68, 68, 0.5);
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.health-indicator__text {
  font-size: 15px;
  font-weight: 600;
}

.health-indicator--online  .health-indicator__text { color: var(--green); }
.health-indicator--offline .health-indicator__text { color: var(--red); }
.health-indicator--loading .health-indicator__text { color: var(--text-muted); }

.health-card__latency {
  font-family: var(--font-mono);
  display: flex;
  align-items: baseline;
  gap: 3px;
}

.health-card__latency-value {
  font-size: 22px;
  font-weight: 600;
  color: var(--green);
}

.health-card__latency-unit {
  font-size: 12px;
  color: var(--text-muted);
}

.health-card__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 12px;
  color: var(--text-muted);
  font-family: var(--font-mono);
  border-top: 1px solid var(--border);
  padding-top: 16px;
}

.health-card__error {
  color: var(--red);
}

.health-card__poll-note {
  margin-left: auto;
}
</style>
```

- [ ] **Step 2: Verificar o widget de health visualmente**

```bash
cd frontend && npm run dev
```

Esperado: card com input de URL, indicador de status (dot verde/vermelho), latência em ms, polling automático.

- [ ] **Step 3: Commit**

```bash
cd ..
git add frontend/src/components/HealthBadge.vue
git commit -m "feat(frontend): implement HealthBadge with live polling and latency display"
```

---

## Task 8: EndpointsReference.vue

**Files:**
- Modify: `frontend/src/components/EndpointsReference.vue`

- [ ] **Step 1: Implementar `frontend/src/components/EndpointsReference.vue`**

```vue
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
      { method: 'GET', path: '/health',         desc: 'Health check básico' },
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
  .ep-desc {
    grid-column: 1 / -1;
    font-size: 12px;
  }
}
</style>
```

- [ ] **Step 2: Verificar tabela de endpoints visualmente**

```bash
cd frontend && npm run dev
```

Esperado: 4 grupos de endpoints, badges coloridos por método, botão "curl" por linha que copia o comando pronto.

- [ ] **Step 3: Commit**

```bash
cd ..
git add frontend/src/components/EndpointsReference.vue
git commit -m "feat(frontend): implement EndpointsReference with method badges and curl copy"
```

---

## Task 9: Integração final e build

**Files:**
- Verify: `frontend/src/App.vue` (padding-top para compensar navbar fixa)

- [ ] **Step 1: Ajustar padding do `main` em App.vue para compensar a navbar fixa**

Em `frontend/src/App.vue`, adicionar dentro do bloco `<style>`:

```css
main {
  padding-top: 60px; /* altura da navbar */
}
```

- [ ] **Step 2: Verificar a página completa no navegador**

```bash
cd frontend && npm run dev
```

Verificar:
- Navbar fixa não sobrepõe o hero
- Scroll suave funciona nos links da navbar
- Health badge faz fetch (pode aparecer "offline" se a API não estiver rodando — esperado)
- Botões curl e copy funcionam
- Página responsiva em tela menor (redimensionar o browser)

- [ ] **Step 3: Rodar o build de produção e verificar**

```bash
cd frontend && npm run build
```

Esperado: pasta `frontend/dist/` criada sem erros, com `index.html` e assets.

```bash
npm run preview
```

Esperado: preview em `http://localhost:4173` com a versão de produção.

- [ ] **Step 4: Commit final**

```bash
cd ..
git add frontend/src/App.vue
git commit -m "feat(frontend): finalize SPA — adjust layout, verify build"
```

---

## Self-Review

**Spec coverage:**
- ✅ `frontend/` isolada do backend — Task 1
- ✅ Vue 3 + Vite — Task 1
- ✅ NavBar com links âncora — Task 3
- ✅ Hero com grid animado, CTAs, feature cards — Task 4
- ✅ Quick Start com terminal fake — Task 5
- ✅ useHealth composable com polling 30s + localStorage — Task 6
- ✅ HealthBadge com status, latência, URL configurável — Task 7
- ✅ EndpointsReference com todos os endpoints, badges coloridos, copiar curl — Task 8
- ✅ Build de produção verificado — Task 9
- ✅ CSS custom properties dark/tech, JetBrains Mono + Inter — App.vue (Task 2)

**Sem placeholders:** nenhum TBD ou TODO encontrado.

**Consistência de tipos:** `useHealth` retorna `{ status, latency, lastChecked, error, check }` — todos usados corretamente em `HealthBadge.vue` via `.value`.
