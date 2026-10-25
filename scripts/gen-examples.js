// Gera exemplos reais para a docs: node scripts/gen-examples.js
const { writeFileSync } = require('node:fs');
const path = require('node:path');
const { createFaker } = require('../src');

const CALLS = {
  person: ['firstName()', 'lastName()', 'fullName()', 'jobTitle()', 'sex()'],
  internet: ['userName()', 'email()', 'domainName()', 'url()', 'ipv4()', 'password()'],
  location: ['city()', 'state()', 'country()', 'streetAddress()', 'zipCode()'],
  phone: ['number()'],
  date: ['past({ days: 30 })', 'future({ days: 30 })', "between({ from: '2025-01-01', to: '2025-06-01' })", 'recent()', 'birthdate()'],
  number: ['int({ min: 1, max: 10 })', 'float({ min: 0, max: 1 })', 'digits(4)', 'bigInt()'],
  string: ['alpha(5)', 'alphanumeric(8)', 'hexadecimal()', 'uuid()'],
  lorem: ['words(4)', 'sentence()', 'paragraph({ sentences: 2 })'],
  br: ['cpf({ formatted: true })', 'cnpj({ formatted: true })'],
  commerce: ['productName()', 'department()', 'price()'],
  finance: ['currencyCode()', 'amount()', 'accountNumber()', 'creditCardNumber()'],
  color: ['human()', 'hex()', 'rgb()', 'hsl()'],
  image: ['url()', 'avatar()'],
  company: ['name()', 'catchPhrase()'],
  system: ['fileName()', 'fileExtension()', 'mimeType()', 'semver()'],
};

const keyOf = (call) => call.replace(/\(.*\)/, '');

const fmt = (v) =>
  v instanceof Date && !isNaN(v) ? v.toISOString() : typeof v === 'bigint' ? `${v.toString()}n` : v;

const out = {};
for (const locale of ['en', 'pt_BR']) {
  const f = createFaker({ seed: 42, locale, referenceDate: '2025-06-15' });
  for (const [mod, calls] of Object.entries(CALLS)) {
    out[locale] = out[locale] || {};
    out[locale][mod] = out[locale][mod] || {};
    for (const call of calls) {
      out[locale][mod][keyOf(call)] = fmt(new Function('f', 'return f.' + mod + '.' + call)(f));
    }
  }
}

writeFileSync(path.join(__dirname, '..', 'docs', 'data', 'examples.json'), JSON.stringify(out, null, 2));
console.log('docs/data/examples.json gerado com seeds reais (seed 42, ref 2025-06-15).');
