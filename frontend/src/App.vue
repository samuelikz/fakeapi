<template>
  <div class="app">
    <NavBar />
    <main>
      <HeroSection />
      <QuickStart />
      <EndpointsReference />
      <HealthBadge />
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

main {
  padding-top: 60px; /* altura da navbar */
}
</style>
