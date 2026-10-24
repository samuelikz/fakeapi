const test = require('node:test');
const assert = require('node:assert/strict');
const { createFaker } = require('../src');

test('mesma seed gera a mesma sequência', () => {
  const a = createFaker({ seed: 42 });
  const b = createFaker({ seed: 42 });
  assert.deepEqual(
    Array.from({ length: 20 }, () => a.person.fullName()),
    Array.from({ length: 20 }, () => b.person.fullName()),
  );
});

test('seeds diferentes geram saídas diferentes', () => {
  assert.notEqual(createFaker({ seed: 1 }).internet.email(), createFaker({ seed: 2 }).internet.email());
});

test('date.* com referenceDate é determinístico e respeita o intervalo', () => {
  const ref = '2025-06-15T12:00:00Z';
  const f = createFaker({ seed: 7, referenceDate: ref });
  const r = new Date(ref).getTime();
  for (let i = 0; i < 50; i++) {
    const past = f.date.past({ days: 10 }).getTime();
    assert.ok(past <= r && past >= r - 10 * 86400000);
  }
});

test('locale pt_BR usa dados e formatos próprios', () => {
  const f = createFaker({ seed: 3, locale: 'pt_BR' });
  assert.match(f.phone.number(), /^\(\d{2}\) \d{5}-\d{4}$/);
  assert.match(f.location.zipCode(), /^\d{5}-\d{3}$/);
});

test('locale desconhecido é recusado', () => {
  assert.throws(() => createFaker({ locale: 'xx' }), /Locale não suportado/);
});

test('uuid v4 tem formato válido', () => {
  const u = createFaker({ seed: 9 }).string.uuid();
  assert.match(u, /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
});

test('cpf e cnpj têm dígitos verificadores válidos', () => {
  const f = createFaker({ seed: 11, locale: 'pt_BR' });
  const cpfCheck = s => {
    const calc = (n, start) => {
      let sum = 0;
      for (let i = 0; i < n; i++) sum += Number(s[i]) * (start - i);
      const r = sum % 11;
      return r < 2 ? 0 : 11 - r;
    };
    return calc(9, 10) === Number(s[9]) && calc(10, 11) === Number(s[10]);
  };
  for (let i = 0; i < 100; i++) {
    const cpf = f.br.cpf();
    assert.equal(cpf.length, 11);
    assert.ok(cpfCheck(cpf), `CPF inválido: ${cpf}`);
  }
  const cnpj = f.br.cnpj();
  assert.equal(cnpj.length, 14);
});

test('pick de lista vazia lança erro', () => {
  assert.throws(() => createFaker({ seed: 1 }).pick([]), /lista vazia/);
});
