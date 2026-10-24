const test = require('node:test');
const assert = require('node:assert/strict');
const { createFaker } = require('../src');

// Luhn: soma com dobra alternada deve ser múltipla de 10.
function luhnValid(num) {
  let sum = 0;
  [...num].reverse().forEach((c, i) => {
    let d = Number(c);
    if (i % 2 === 1) d = d * 2 > 9 ? d * 2 - 9 : d * 2;
    sum += d;
  });
  return sum % 10 === 0;
}

test('cartão de crédito passa no Luhn e tem o prefixo do emissor', () => {
  const f = createFaker({ seed: 2 });
  for (let i = 0; i < 200; i++) {
    const visa = f.finance.creditCardNumber();
    assert.equal(visa.length, 16);
    assert.equal(visa[0], '4');
    assert.ok(luhnValid(visa), `Luhn falhou: ${visa}`);
    const mc = f.finance.creditCardNumber({ issuer: 'mastercard' });
    assert.ok(/^5[1-5]/.test(mc));
    assert.ok(luhnValid(mc), `Luhn falhou: ${mc}`);
  }
});

test('emissor desconhecido é recusado', () => {
  assert.throws(() => createFaker({ seed: 1 }).finance.creditCardNumber({ issuer: 'x' }), /não suportado/);
});

test('cores em formato válido', () => {
  const f = createFaker({ seed: 4 });
  assert.match(f.color.hex(), /^#[0-9a-f]{6}$/);
  assert.match(f.color.rgb(), /^rgb\(\d{1,3}, \d{1,3}, \d{1,3}\)$/);
});

test('preço e valor respeitam o intervalo e as casas decimais', () => {
  const f = createFaker({ seed: 8 });
  for (let i = 0; i < 100; i++) {
    const p = f.commerce.price({ min: 5, max: 10 });
    assert.ok(p >= 5 && p <= 10);
    assert.equal(Number(p.toFixed(2)), p);
  }
});

test('image.url usa o tamanho pedido', () => {
  assert.match(createFaker({ seed: 1 }).image.url({ width: 300, height: 200 }), /\/300\/200$/);
});
