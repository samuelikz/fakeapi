import Code from '../../Code';

export const metadata = { title: 'Estabilidade da saída' };

export default function Page() {
  return (
    <article>
      <h1>Estabilidade da saída</h1>
      <p className="lead">O contrato de reprodução e o que pode (e o que não pode) quebrá-lo.</p>

      <p>A promessa central do pacote é: <strong>para uma seed fixa, a saída só muda quando a versão do algoritmo muda</strong>. As regras na prática:</p>

      <ul>
        <li>A constante da versão fica em <code className="inline">src/random.js</code> e é exposta como <code className="inline">Faker.ALGORITHM_VERSION</code>.</li>
        <li>Qualquer mudança que altere a sequência de um seed é <strong>breaking change</strong>: sobe a versão major e entra no <code className="inline">CHANGELOG.md</code>.</li>
        <li>Os dados de locale (nomes, cidades etc.) fazem parte da saída e, portanto, do contrato: alterá-los muda os valores de um seed.</li>
        <li>Os testes em <code className="inline">tests/contract.test.js</code> travam a saída de seeds fixos para <code className="inline">en</code> e <code className="inline">pt_BR</code>.</li>
      </ul>

      <h2>Datas e referenceDate</h2>
      <p>Os métodos de <code className="inline">date</code> dependem de um ponto de referência. Se você não definir <code className="inline">referenceDate</code> na criação, o relógio atual é usado e a saída deixa de ser reproduzível entre execuções. Para testes, fixe as duas coisas:</p>
      <Code>{`const f = createFaker({ seed: 42, referenceDate: '2025-06-15' });
f.date.past({ days: 30 }); // sempre 2025-05-22T00:28:07.382Z`}</Code>

      <h2>Recomendações</h2>
      <ul>
        <li>Para testes do seu projeto, fixe a versão deste pacote no lockfile.</li>
        <li>Ao atualizar de versão, confira o <code className="inline">CHANGELOG.md</code>: mudanças que quebram a sequência estão sempre lá.</li>
      </ul>
    </article>
  );
}
