// Contrato de estabilidade: para seeds fixos, a saída não pode mudar sem bump de ALGORITHM_VERSION.
// Se um destes testes falhar, a mudança quebra quem depende de dados reproduzíveis.
const test = require('node:test');
const assert = require('node:assert/strict');
const { createFaker } = require('../src');

const REF = '2025-06-15T12:00:00Z';

test('contrato en, seed 123', () => {
  const f = createFaker({ seed: 123, locale: 'en', referenceDate: REF });
  assert.deepEqual([
    f.person.fullName(),
    f.internet.email(),
    f.location.city(),
    f.phone.number(),
    f.date.past({ days: 30 }).toISOString(),
    f.string.uuid(),
    f.commerce.productName(),
    f.commerce.price(),
    f.finance.creditCardNumber(),
    f.color.hex(),
    f.company.name(),
    f.system.fileName({ ext: 'pdf' }),
  ], [
    'Mason Williams',
    'lucasmiller42@example.com',
    'Maple Grove',
    '(480) 869-1150',
    '2025-06-06T15:55:32.836Z',
    'e793b5ec-4c65-47fd-9d51-9cc95202d3b0',
    'Sleek Wooden Bottle',
    992.69,
    '4822305716482378',
    '#ee08af',
    'Johnson LLC',
    'ajfctkofnw.pdf',
  ]);
});

test('contrato pt_BR, seed 123', () => {
  const f = createFaker({ seed: 123, locale: 'pt_BR', referenceDate: REF });
  assert.deepEqual([
    f.person.fullName(),
    f.internet.email(),
    f.location.zipCode(),
    f.br.cpf(),
    f.br.cnpj(),
    f.commerce.productName(),
    f.finance.currencyCode(),
  ], [
    'Rafael Oliveira',
    'felipealmeida42@exemplo.com.br',
    '64808-691',
    '15079462795',
    '39727336000196',
    'Garrafa de Bambu Refinada',
    'GBP',
  ]);
});
