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

.navbar__links a:not(.navbar__github) {
  font-size: 14px;
  color: var(--text-dim);
  text-decoration: none;
  transition: color 0.15s;
}

.navbar__links a:not(.navbar__github):hover {
  color: var(--text);
  text-decoration: none;
}

.navbar__github {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--green);
  border: 1px solid rgba(0, 255, 136, 0.3);
  border-radius: var(--radius);
  padding: 5px 12px;
  transition: background 0.15s;
}

.navbar__github:hover {
  background: var(--green-dim);
}
</style>
