// Garante que o backend nativo (Rust) e o JS produzem a mesma sequência.
const test = require('node:test');
const assert = require('node:assert/strict');
const { Random, JsRandom, backend } = require('../src/random');

const SEEDS = [0, 1, 42, 123, 'abc', 'São Paulo', '日本', 2 ** 31 + 5, ''];

test('backend nativo e JS geram a mesma sequência', { skip: backend !== 'native' && 'addon nativo não compilado' }, () => {
  for (const seed of SEEDS) {
    const js = new JsRandom(seed);
    const rs = new Random(seed);
    for (let i = 0; i < 5000; i++) {
      assert.equal(rs.next(), js.next(), `seed ${JSON.stringify(seed)} posição ${i}`);
    }
  }
});

test('o backend JS de fallback continua funcionando', () => {
  const r = new JsRandom(7);
  for (let i = 0; i < 1000; i++) {
    const v = r.next();
    assert.ok(v >= 0 && v < 1);
  }
});
