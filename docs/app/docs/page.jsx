import Link from 'next/link';
import Code from '../Code';

export const metadata = { title: 'Primeiros passos' };

export default function Page() {
  return (
    <article>
      <h1>Primeiros passos</h1>
      <p className="lead">Instalação, uso básico e tudo que você precisa para gerar seu primeiro dado falso.</p>

      <h2>Instalação</h2>
      <p>O pacote está publicado no npm como <code className="inline">@samuelikz/fakegen</code> e não tem nenhuma dependência. Requer Node.js 18 ou superior.</p>
      <Code>{`npm install @samuelikz/fakegen`}</Code>
      <table>
        <tbody>
          <tr><td><code className="inline">pnpm</code></td><td><code className="inline">pnpm add @samuelikz/fakegen</code></td></tr>
          <tr><td><code className="inline">yarn</code></td><td><code className="inline">yarn add @samuelikz/fakegen</code></td></tr>
          <tr><td><code className="inline">bun</code></td><td><code className="inline">bun add @samuelikz/fakegen</code></td></tr>
        </tbody>
      </table>

      <h2>ESM ou CommonJS</h2>
      <p>O pacote é CommonJS. Em projetos com <code className="inline">import</code>, importe o pacote inteiro e desestruture:</p>
      <Code>{`import fakegen from '@samuelikz/fakegen';
const { createFaker, faker, Faker } = fakegen;

export const f = createFaker({ seed: 42, locale: 'pt_BR' });`}</Code>

      <h2>Uso</h2>
      <p>A forma recomendada é criar uma instância com <Link href="/docs/createfaker"><code className="inline">createFaker()</code></Link>, passando seed, locale e data de referência:</p>
      <Code>{`const { createFaker, faker } = require('@samuelikz/fakegen');

// Reprodutível: mesmo seed, mesma saída
const f = createFaker({ seed: 42, locale: 'pt_BR', referenceDate: '2025-06-15' });

f.person.fullName();             // "Gabriel Oliveira"
f.internet.email();              // "diegosilva@mail.test"
f.location.zipCode();            // "75386-366"
f.phone.number();                // "(75) 73044-0349"
f.br.cpf({ formatted: true });   // "081.234.929-60"
f.date.past({ days: 30 });       // 2025-05-22T00:28:07.382Z
f.finance.creditCardNumber();    // "4757837469622601"

// Instância padrão, sem seed (cada execução gera valores diferentes)
faker.number.int({ min: 1, max: 10 });`}</Code>
      <p>Todos os valores acima são exemplos reais com <code className="inline">seed: 42</code>. A saída exata depende da versão do pacote; veja <Link href="/docs/stability">Estabilidade da saída</Link>.</p>

      <h2>Instância padrão vs. instância própria</h2>
      <p>
        O pacote exporta <code className="inline">faker</code>, uma instância padrão criada sem seed
        (a semente é o relógio atual). Use-a em scripts e protótipos. Para testes, sempre crie
        a sua com <Link href="/docs/createfaker"><code className="inline">createFaker</code></Link> e
        uma seed fixa.
      </p>

      <h2>Próximos passos</h2>
      <ul>
        <li><Link href="/docs/seed">Seeds e locales</Link>: como o determinismo e o fallback de idioma funcionam.</li>
        <li><Link href="/docs/stability">Estabilidade da saída</Link>: quando a saída de um seed pode mudar.</li>
        <li><Link href="/docs/api/faker">Faker (instância)</Link>: métodos de baixo nível, úteis para estratégias próprias.</li>
      </ul>
    </article>
  );
}
