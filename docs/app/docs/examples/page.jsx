import Link from 'next/link';
import Code from '../../Code';

export const metadata = { title: 'Exemplos práticos' };

export default function Page() {
  return (
    <article>
      <h1>Exemplos práticos</h1>
      <p className="lead">Receitas completas com <code className="inline">@samuelikz/fakegen</code> para situações comuns. Copie, ajuste os nomes e rode.</p>

      <h2>Mock de response de API REST</h2>
      <Code>{`// users.js: implanta em um handler de rota para testar telas com dados verossímeis
const { createFaker } = require('@samuelikz/fakegen');

function users(n = 12) {
  const f = createFaker({ seed: 42, locale: 'pt_BR', referenceDate: '2025-06-15' });
  return Array.from({ length: n }, () => ({
    id: f.int({ min: 1, max: 9999 }),
    name: f.person.fullName(),
    email: f.internet.email(),
    job: f.person.jobTitle(),
    city: f.location.city(),
    phone: f.phone.number(),
    avatar: f.image.avatar(),
    createdAt: f.date.past({ days: 180 }).toISOString(),
  }));
}

// GET /api/users -> res.json(users())`}</Code>

      <h2>Popular uma tabela de clientes (SQL)</h2>
      <Code>{`const { createFaker } = require('@samuelikz/fakegen');
const f = createFaker({ seed: 7, locale: 'pt_BR' });

const rows = Array.from({ length: 100 }, () => {
  const doc = f.bool(0.7) ? f.br.cpf() : f.br.cnpj();
  return [f.person.fullName(), doc, f.company.name(), f.finance.amount({ min: 50, max: 5000 })];
});

const sql = rows
  .map(([nome, doc, empresa, saldo]) =>
    \`  ('\${nome}', '\${doc}', '\${empresa}', \${saldo.toFixed(2)})\`)
  .join(',\n');
console.log('INSERT INTO cliente (nome, documento, empresa, saldo) VALUES\n' + sql + ';');`}</Code>

      <h2>Fixtures de teste em JSON</h2>
      <Code>{`const { createFaker } = require('@samuelikz/fakegen');
const fs = require('node:fs');

const f = createFaker({ seed: 42, locale: 'pt_BR' });
const pedidos = Array.from({ length: 50 }, () => ({
  numero: f.number.digits(8),
  cliente: f.br.cpf() ? f.person.fullName() : f.company.name(),
  itens: Array.from({ length: f.int({ min: 1, max: 5 }) }, () => ({
    produto: f.commerce.productName(),
    preco: f.commerce.price({ min: 10, max: 500 }),
  })),
  criadoEm: f.date.recent({ days: 7 }).toISOString(),
}));

fs.writeFileSync('fixtures/pedidos.json', JSON.stringify(pedidos, null, 2));`}</Code>

      <h2>Dados visuais para um protótipo</h2>
      <Code>{`const { createFaker } = require('@samuelikz/fakegen');
const f = createFaker({ seed: 42 });

const produtos = Array.from({ length: 9 }, () => ({
  nome: f.commerce.productName(),
  preco: f.commerce.price({ min: 20, max: 300 }),
  imagem: f.image.url({ width: 400, height: 300 }),
  cor: f.color.hex(),
  tag: f.commerce.department(),
}));
// Cada card da vitrine fica preenchido: nome, preço, foto placeholder e cor de acento.`}</Code>

      <h2>Vault de senhas e credenciais de teste</h2>
      <Code>{`const { createFaker } = require('@samuelikz/fakegen');
const f = createFaker({ seed: 99 });

const credenciais = {
  usuario: f.person.fullName(),
  email: f.internet.email(),
  senha: f.internet.password({ length: 20 }),
  apiKey: f.string.hexadecimal(32),
  cartao: f.finance.creditCardNumber({ issuer: 'mastercard', formatted: true }),
};
// Nunca use em produção: dados fictícios para testes automatizados.`}</Code>

      <h2>Texto de preenchimento no idioma certo</h2>
      <Code>{`const { createFaker } = require('@samuelikz/fakegen');

const pt = createFaker({ seed: 42, locale: 'pt_BR' });
const en = createFaker({ seed: 42, locale: 'en' });

const artigos = {
  'pt-br': { titulo: pt.lorem.sentence(), texto: pt.lorem.paragraph({ sentences: 5 }) },
  en: { titulo: en.lorem.sentence(), texto: en.lorem.paragraph({ sentences: 5 }) },
};`}</Code>

      <p>
        Veja os valores de saída de cada método na <Link href="/docs/cheatsheet">Cheatsheet</Link>,
        todas geradas com uma seed fixa.
      </p>
    </article>
  );
}
