// PRNG determinístico (sfc32). Mesmo seed + mesma ALGORITHM_VERSION => mesma sequência.
// Usa o addon nativo (napi-rs, em native/) quando disponível; senão, a implementação JS abaixo.
// As duas implementações produzem exatamente a mesma sequência (ver tests/native.test.js).
const ALGORITHM_VERSION = 1;

function fnv1a(str) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h;
}

class JsRandom {
  constructor(seed) {
    const s = String(seed);
    this.a = fnv1a(`v${ALGORITHM_VERSION}:${s}`);
    this.b = fnv1a(s + ':b');
    this.c = fnv1a(s + ':c');
    this.d = fnv1a(s + ':d');
    for (let i = 0; i < 16; i++) this.next(); // descarta o começo, que é fraco
  }

  // Float em [0, 1)
  next() {
    const t = (((this.a + this.b) | 0) + (this.d = (this.d + 1) | 0)) | 0;
    this.a = this.b ^ (this.b >>> 9);
    this.b = (this.c + (this.c << 3)) | 0;
    this.c = (this.c << 21) | (this.c >>> 11);
    this.c = (this.c + t) | 0;
    return (t >>> 0) / 4294967296;
  }
}

function loadNative() {
  try {
    const native = require('../native');
    if (native.algorithmVersion() !== ALGORITHM_VERSION) return null;
    return native;
  } catch {
    return null;
  }
}

const native = loadNative();

class NativeRandomAdapter {
  constructor(seed) {
    this.impl = new native.NativeRandom(String(seed));
  }

  next() {
    return this.impl.next();
  }
}

const Random = native ? NativeRandomAdapter : JsRandom;
const backend = native ? 'native' : 'js';

module.exports = { Random, JsRandom, ALGORITHM_VERSION, backend };
