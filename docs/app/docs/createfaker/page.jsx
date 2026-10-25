import Link from 'next/link';
import Code from '../../Code';

export const metadata = { title: 'createFaker' };

export default function Page() {
  return (
    <article>
      <h1>createFaker</h1>
      <p className="lead">Cria uma instância de <code className="inline">Faker</code> com as opções que você quiser.</p>

      <Code>{`const { createFaker } = require('@samuelikz/fakegen');

const f = createFaker({
  seed: 42,
  locale: 'pt_BR',
  referenceDate: '2025-06-15',
});`}</Code>

      <h2>Opções</h2>
      <table>
        <thead>
          <tr><th>Opção</th><th>Padrão</th><th>Descrição</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><code className="inline">seed</code></td>
            <td><code className="inline">Date.now()</code></td>
            <td>Semente do PRNG. Mesma semente, mesmo locale e mesma versão do algoritmo geram a mesma sequência.</td>
          </tr>
          <tr>
            <td><code className="inline">locale</code></td>
            <td><code className="inline">'en'</code></td>
            <td><code className="inline">'en'</code> ou <code className="inline">'pt_BR'</code>. Chaves que faltam num locale caem para <code className="inline">en</code>. Locale desconhecido lança erro.</td>
          </tr>
          <tr>
            <td><code className="inline">referenceDate</code></td>
            <td>agora</td>
            <td>Data (string <code className="inline">ISO</code> ou <code className="inline">Date</code>) usada por <code className="inline">date.past</code>, <code className="inline">date.future</code>, <code className="inline">date.recent</code> e <code className="inline">date.birthdate</code>.</td>
          </tr>
        </tbody>
      </table>

      <h2>Métodos da instância</h2>
      <p>Além dos módulos, a instância expõe utilitários de baixo nível. Veja a referência completa em <Link href="/docs/api/faker">Faker (instância)</Link>.</p>
    </article>
  );
}
