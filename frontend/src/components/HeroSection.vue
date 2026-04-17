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
