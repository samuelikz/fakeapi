import Link from 'next/link';
import { modules } from '../../../data/api';
import examplesData from '../../../data/examples.json';
import Code from '../../Code';

export const metadata = { title: 'Cheatsheet' };

const ARGS = {
  past: '({ days: 30 })', future: '({ days: 30 })',
  between: "({ from: '2025-01-01', to: '2025-06-01' })", int: '({ min: 1, max: 10 })',
  float: '({ min: 0, max: 1 })', digits: '(4)', alpha: '(5)', alphanumeric: '(8)',
  words: '(4)', paragraph: '({ sentences: 2 })',
  cpf: '({ formatted: true })', cnpj: '({ formatted: true })',
};

export default function Page() {
  const lines = [];
  for (const mod of modules) {
    const ex = examplesData.pt_BR[mod.slug] || {};
    for (const m of mod.methods) {
      const call = `f.${mod.title}.${m.name}${ARGS[m.name] || '()'}`;
      const v = ex[m.name] !== undefined ? ex[m.name] : null;
      const comment = v !== undefined
        ? JSON.stringify(typeof v === 'string' ? v : v)
        : m.example.split(/\/\/ */)[1]?.replace(/"$/, '') || '';
      lines.push(`${call}; // ${comment}`);
    }
    lines.push('');
  }

  return (
    <article>
      <h1>Cheatsheet</h1>
      <p className="lead">
        Todos os métodos do <code className="inline">@samuelikz/fakegen</code> em uma página só,
        com valores reais de <code className="inline">seed: 42</code> no locale{' '}
        <code className="inline">pt_BR</code>.
      </p>
      <p>
        Descrições completas em <Link href="/docs/createfaker">createFaker</Link> e nas páginas
        de cada módulo na <Link href="/docs/api/person">API</Link>.
      </p>
      <Code>{`const { createFaker } = require('@samuelikz/fakegen');
const f = createFaker({ seed: 42, locale: 'pt_BR', referenceDate: '2025-06-15' });

${lines.filter((l, i, a) => !(i === a.length - 1 && l === '')).join('\n')}`}</Code>
    </article>
  );
}
