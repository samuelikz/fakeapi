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
