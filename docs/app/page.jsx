import Link from 'next/link';
import { modules } from '../data/api';
import Code from './Code';

export const metadata = { title: '@samuelikz/fakegen: gerador de dados de exemplo' };

const ICONS = {
  person: '🧑', internet: '🌐', location: '📍', phone: '📞', date: '🗓️',
  number: '🔢', string: '🔤', lorem: '📝', br: '🇧🇷', commerce: '🛒',
  finance: '💳', color: '🎨', image: '🖼️', company: '🏢', system: '💻',
};

export default function Home() {
  return (
    <div>
      <section className="hero">
        <span className="emoji">🎲</span>
        <span className="pill">v0.1.0 · sem dependências · MIT</span>
        <h1>
          Dados de exemplo <em>reproduzíveis</em>, em uma linha.
        </h1>
        <p className="sub">
          Gerador de dados falso para JavaScript. Determinístico com seed, com locales{' '}
          <code className="inline">en</code> e <code className="inline">pt_BR</code>, data de
          referência fixa e nada de dependências. Feito para testes que nunca flacam.
        </p>
        <p className="badges">
          <span>
            <img src="https://img.shields.io/badge/npm-v0.1.0-7c5cff" alt="versão no npm" />
          </span>
          <span>
            <img src="https://img.shields.io/badge/node-18%2B-339933" alt="node 18 ou superior" />
          </span>
          <span>
            <img src="https://img.shields.io/badge/depend%C3%AAncias-0-18a06b" alt="zero dependências" />
          </span>
          <span>
            <img src="https://img.shields.io/badge/licen%C3%A7a-MIT-5d3df0" alt="licença MIT" />
          </span>
        </p>
        <div className="cta">
          <Link href="/docs" className="btn primary">Começar agora →</Link>
          <Link href="/docs/api/person" className="btn ghost">Explorar a API</Link>
        </div>
      </section>

      <section>
        <Code>{`const { createFaker } = require('@samuelikz/fakegen');

// Reprodutível: mesmo seed, mesma saída
const f = createFaker({ seed: 42, locale: 'pt_BR', referenceDate: '2025-06-15' });

f.person.fullName();            // "Gabriel Oliveira"
f.internet.email();             // "diegosilva@mail.test"
f.location.zipCode();           // "75386-366"
f.br.cpf({ formatted: true });  // "081.234.929-60"`}</Code>
      </section>

      <section>
        <div className="section-title">
          <h2>Módulos</h2>
          <Link href="/docs" className="ver-tudo">Documentação completa →</Link>
        </div>
        <div className="grid">
          {modules.map((m) => (
            <Link key={m.slug} href={`/docs/api/${m.slug}`} className="cardl">
              <span className="icon">{ICONS[m.slug]}</span>
              <h3>{m.title}</h3>
              <p className="nm">{m.methods.map((x) => x.name).join(' · ')}</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="section-title">
          <h2>Por que fakegen?</h2>
        </div>
        <div className="features">
          <div className="feature">
            <span className="icon">📦</span>
            <h3>Zero dependências</h3>
            <p>CommonJS puro, Node 18+. Seu <code className="inline">node_modules</code> agradece.</p>
          </div>
          <div className="feature">
            <span className="icon">🎯</span>
            <h3>Determinístico</h3>
            <p>Mesma seed, mesma sequência, garantida por testes de contrato travados em <code className="inline">en</code> e <code className="inline">pt_BR</code>.</p>
          </div>
          <div className="feature">
            <span className="icon">🌍</span>
            <h3>Locales com fallback</h3>
            <p>Nomes e formatos em português ou inglês. Chave ausente em <code className="inline">pt_BR</code> cai para <code className="inline">en</code> automaticamente.</p>
          </div>
          <div className="feature">
            <span className="icon">🇧🇷</span>
            <h3>Dados do Brasil</h3>
            <p>CPF e CNPJ com dígitos verificadores válidos, CEP e telefone no formato nacional.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
