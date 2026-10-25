import Link from 'next/link';
import Code from '../../../Code';

export const metadata = { title: 'Faker (instância)' };

const methods = [
  { name: 'seed', sig: 'f.seed(value)', ret: 'Faker', desc: 'Reinicia o PRNG com uma semente. Encadeável.', ex: 'const primeiro = f.internet.email();\nf.seed(42); // sequência reiniciada' },
  { name: 'random', sig: 'f.random()', ret: 'number', desc: 'Próximo número do PRNG, em [0, 1).', ex: 'f.random(); // 0.3745…' },
  { name: 'int', sig: 'f.int({ min?, max? }?)', ret: 'number', desc: 'Inteiro em [min, max]. Padrões: 0 e 2147483647.', ex: 'f.int({ min: 1, max: 10 }); // 7' },
  { name: 'float', sig: 'f.float({ min?, max?, precision? }?)', ret: 'number', desc: 'Decimal em passos de `precision`. Padrões: 0..1, precisão 0.01.', ex: 'f.float({ min: 0, max: 1 }); // 0.37' },
  { name: 'bool', sig: 'f.bool(probability?)', ret: 'boolean', desc: 'Verdadeiro com a probabilidade dada (padrão 0.5).', ex: 'f.bool(0.3); // false' },
  { name: 'pick', sig: 'f.pick(list)', ret: 'any', desc: 'Item aleatório de uma lista. Lista vazia lança erro.', ex: "f.pick(['comum', 'raro']); // \"comum\"" },
  { name: 'shuffle', sig: 'f.shuffle(list)', ret: 'any[]', desc: 'Cópia embaralhada (Fisher-Yates). A lista original não é alterada.', ex: 'f.shuffle([1, 2, 3]); // [3, 1, 2]' },
  { name: 'weighted', sig: 'f.weighted(pairs)', ret: 'any', desc: 'Escolha ponderada. `pairs` é uma lista de pares [valor, peso].', ex: "f.weighted([['comum', 9], ['raro', 1]]);" },
  { name: 'fromFormat', sig: 'f.fromFormat(format)', ret: 'string', desc: 'Substitui `#` por dígito aleatório (0 a 9) e `?` por letra (A a Z).', ex: "f.fromFormat('###.?#'); // \"042.K8\"" },
  { name: 'data', sig: 'f.data(key)', ret: 'any', desc: 'Dado do locale atual, com fallback automático para `en`.', ex: "f.data('firstNamesMale');" },
];

export default function Page() {
  return (
    <article>
      <h1 style={{ fontFamily: 'var(--mono)' }}>Faker (instância)</h1>
      <p className="lead">
        Além dos módulos (person, internet, date…), toda instância expõe utilitários de
        baixo nível usados pelos próprios módulos. Eles são úteis para criar dados no seu
        formato.
      </p>

      <p>O construtor aceita <code className="inline">seed</code>, <code className="inline">locale</code> e <code className="inline">referenceDate</code>. Veja <Link href="/docs/createfaker">createFaker</Link>.</p>

      {methods.map((m) => (
        <section key={m.name} className="api-method" id={m.name}>
          <div className="head"><h3>{m.sig}</h3></div>
          <div className="body">
            <p>{m.desc}</p>
            <p>Retorna <span className="tag">{m.ret}</span></p>
            <Code>{`const f = createFaker({ seed: 42 });
${m.ex}`}</Code>
          </div>
        </section>
      ))}

      <h2>Constantes</h2>
      <table>
        <thead><tr><th>Nome</th><th>Descrição</th></tr></thead>
        <tbody>
          <tr>
            <td><code className="inline">Faker.ALGORITHM_VERSION</code></td>
            <td>Versão do algoritmo de geração. Mudanças que afetam a sequência de uma seed exigem que esta constante mude (e um major release).</td>
          </tr>
        </tbody>
      </table>
    </article>
  );
}
