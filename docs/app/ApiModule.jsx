'use client';

import { useState } from 'react';
import Link from 'next/link';
import Code from './Code';

const LOCALES = [
  { id: 'pt_BR', label: 'pt_BR' },
  { id: 'en', label: 'en' },
];

// Argumentos usados em cada chamada para bater com data/examples.json
const ARGS = {
  firstName: '()', lastName: '()', fullName: '()', jobTitle: '()', sex: '()',
  userName: '()', email: '()', domainName: '()', url: '()', ipv4: '()', password: '()',
  city: '()', state: '()', country: '()', streetAddress: '()', zipCode: '()',
  number: '()',
  past: '({ days: 30 })', future: '({ days: 30 })',
  between: "({ from: '2025-01-01', to: '2025-06-01' })", recent: '()', birthdate: '()',
  int: '({ min: 1, max: 10 })', float: '({ min: 0, max: 1 })', digits: '(4)', bigInt: '()',
  alpha: '(5)', alphanumeric: '(8)', hexadecimal: '()', uuid: '()',
  words: '(4)', sentence: '()', paragraph: '({ sentences: 2 })',
  cpf: '({ formatted: true })', cnpj: '({ formatted: true })',
  productName: '()', department: '()', price: '()',
  currencyCode: '()', amount: '()', accountNumber: '()', creditCardNumber: '()',
  human: '()', hex: '()', rgb: '()', hsl: '()',
  avatar: '()',
  name: '()', catchPhrase: '()',
  fileExtension: '()', mimeType: '()', semver: '()',
  // fileName precisa de URL completa: mantido inline abaixo
};

export default function ApiModule({ mod, examples, next, prev }) {
  const [locale, setLocale] = useState('pt_BR');
  const values = (examples && examples[locale] && examples[locale][mod.slug]) || (examples && examples.en && examples.en[mod.slug]) || {};

  const codeFor = (m) => {
    const call = `f.${mod.title}.${m.name}${ARGS[m.name] || '()'}`;
    const v = values[m.name];
    if (v === undefined) {
      // Exemplo manual do data/api.js (campo example) já contém a chamada e o valor
      return `const f = createFaker({ seed: 42 });\n${m.example}`;
    }
    const shown = typeof v === 'string' ? JSON.stringify(v) : String(v);
    return `const f = createFaker({ seed: 42, locale: '${lang(locale)}' });\n${call}; // ${shown}`;
  };

  function lang(id) { return id; }

  return (
    <article>
      <nav className="crumb" aria-label="você está aqui">
        <Link href="/docs">Documentação</Link>
        <span>/</span>
        <span>API</span>
        <span>/</span>
        <b>{mod.title}</b>
      </nav>
      <h1 style={{ fontFamily: 'var(--mono)' }}>f.{mod.title}</h1>
      <p className="lead">{mod.description}</p>

      <div className="locale-bar">
        <span>Saída de exemplo:</span>
        {LOCALES.map((l) => (
          <button
            key={l.id}
            type="button"
            className={'loc-btn' + (locale === l.id ? ' on' : '')}
            onClick={() => setLocale(l.id)}
          >
            {l.label}
          </button>
        ))}
      </div>

      <div className="api-grid">
        <div className="api-main">
          {mod.methods.map((m) => (
            <section key={m.name} className="api-method" id={m.name}>
              <div className="head">
                <h3>
                  <span className="headmod">f.{mod.title}.</span>
                  <span className="headfn">{m.name}</span>
                </h3>
              </div>
              <div className="body">
                <div className="sig">{m.signature}</div>
                {m.params.length > 0 && (
                  <table>
                    <thead>
                      <tr><th>Parâmetro</th><th>Tipo</th><th>Descrição</th></tr>
                    </thead>
                    <tbody>
                      {m.params.map(([p, t, d]) => (
                        <tr key={p}><td><code className="inline">{p}</code></td><td><code className="inline">{t}</code></td><td>{d}</td></tr>
                      ))}
                    </tbody>
                  </table>
                )}
                <p>
                  Retorna <span className="tag">{m.returns}</span>
                </p>
                <Code>{codeFor(m)}</Code>
              </div>
            </section>
          ))}

          <div className="postnav">
            {prev ? (
              <Link href={`/docs/api/${prev.slug}`}><small>← Anterior</small><span>{prev.title}</span></Link>
            ) : <span />}
            {next ? (
              <Link href={`/docs/api/${next.slug}`} className="next"><small>Próximo →</small><span>{next.title}</span></Link>
            ) : <span />}
          </div>
        </div>

        <aside className="toc">
          <b>Métodos</b>
          <ul>
            {mod.methods.map((m) => (
              <li key={m.name}><a href={`#${m.name}`}>{m.name}</a></li>
            ))}
          </ul>
        </aside>
      </div>
    </article>
  );
}
