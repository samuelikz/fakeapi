# SPA Frontend — fakeapi Showcase

**Data:** 2026-04-16  
**Status:** Aprovado  

## Objetivo

Criar uma SPA de vitrine (showcase) em pasta separada `frontend/` para apresentar o projeto fakeapi a desenvolvedores que o descobrem no GitHub. O foco é comunicar rapidamente o que a API faz, como rodar, e quais endpoints estão disponíveis.

## Stack

- **Framework:** Vue 3 (Composition API)
- **Build tool:** Vite
- **CSS:** Custom properties puras — sem frameworks externos
- **Fontes:** JetBrains Mono (código) + Inter (texto) via Google Fonts
- **Estilo visual:** Dark/tech — fundo `#0d0d0d`, verde terminal `#00ff88`, roxo `#7c3aed`
- **Sem vue-router** — single page com scroll suave para âncoras

## Estrutura de Arquivos

```
frontend/
├── index.html
├── package.json
├── vite.config.js
├── public/
│   └── logo.png
└── src/
    ├── main.js
    ├── App.vue
    ├── components/
    │   ├── NavBar.vue
    │   ├── HeroSection.vue
    │   ├── QuickStart.vue
    │   ├── EndpointsReference.vue
    │   └── HealthBadge.vue
    └── composables/
        └── useHealth.js
```

## Seções da Página

### NavBar
- Fixa no topo
- Logo + nome "fakeapi"
- Links âncora para cada seção
- Badge de health status (verde/vermelho) integrado com `useHealth.js`

### Hero
- Fundo com grid animado sutil
- Título grande: `fakeapi`
- Tagline: "REST API para protótipos, testes e demos rápidas"
- Dois CTAs: `GitHub` e `Quick Start`
- 3 feature cards: CRUD dinâmico, JWT Auth, Zero config

### Quick Start
- Terminal fake estilo dark
- 3 passos: clone, install, dev
- Código copiável

### Endpoints Reference
- Tabela completa de endpoints
- Badge de método colorido por tipo: GET=azul, POST=verde, PUT=amarelo, DELETE=vermelho
- Botão "Copiar curl" por linha — monta curl dinamicamente com base URL configurada
- Cobre: CRUD de recursos, auth, health checks, sistema

### Health Badge
- Widget com URL da API configurável (input, persiste em localStorage)
- Fetch em `GET /health` com polling a cada 30s
- Exibe: status, latência em ms, última verificação
- Estado: carregando / online / offline

## Composable: useHealth.js

```js
// Retorna: { status, latency, loading, error }
// - URL da API via localStorage, fallback: https://fakeapi.aioher.com
// - Polling a cada 30s com setInterval
// - Cancela polling no onUnmounted
```

## Build e Deploy

- `npm run dev` (porta 5173) — desenvolvimento independente do backend
- `npm run build` — gera `frontend/dist/`
- Deploy options:
  - GitHub Pages / Vercel / Netlify (independente)
  - Express static: `app.use(express.static('frontend/dist'))`
- Nenhum arquivo do backend é modificado

## Dependências

```json
{
  "dependencies": {
    "vue": "^3.x"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.x",
    "vite": "^5.x"
  }
}
```

## O que não está no escopo

- Testes automatizados (showcase estático não justifica)
- SSR / Nuxt (overkill para vitrine de dev tool)
- i18n (projeto é em português)
- Autenticação na própria vitrine
