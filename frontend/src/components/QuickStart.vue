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
  }).catch(() => {
    console.warn('Clipboard write failed')
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
  color: var(--text-muted);
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
