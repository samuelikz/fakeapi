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
const DEFAULT_URL = 'https://fakeapi.aioher.com'

const savedUrl = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null
const inputUrl = ref(savedUrl || DEFAULT_URL)
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
