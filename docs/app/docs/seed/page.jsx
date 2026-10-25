import Code from '../../Code';

export const metadata = { title: 'Seeds e locales' };

export default function Page() {
  return (
    <article>
      <h1>Seeds e locales</h1>
      <p className="lead">Como o determinismo funciona e como o fallback de idioma é resolvido.</p>

      <h2>Seeds</h2>
      <p>Cada instância mantém seu próprio PRNG (xorshift semeado). Passar a mesma seed produz exatamente a mesma sequência de valores, desde que a versão do algoritmo (exposta como <code className="inline">Faker.ALGORITHM_VERSION</code>) e os dados de locale sejam os mesmos.</p>
      <Code>{`const { createFaker } = require('@samuelikz/fakegen');

const a = createFaker({ seed: 42 });
const b = createFaker({ seed: 42 });

a.person.fullName() === b.person.fullName(); // true
a.rng === b.rng; // false: cada instância tem seu PRNG`}</Code>

      <p>A seed pode ser redefinida a qualquer momento com <code className="inline">f.seed(value)</code>, o que reinicia a sequência:</p>
      <Code>{`const primeiro = f.internet.email();
f.seed(42);
// a partir daqui, a sequência começa de novo`}</Code>

      <h2>Locales</h2>
      <p>Atualmente há dois locales: <code className="inline">'en'</code> (padrão) e <code className="inline">'pt_BR'</code>. Todos os métodos que usam dados textuais (nomes, cidades, cargos etc.) leem do locale da instância.</p>
      <Code>{`const f = createFaker({ seed: 42, locale: 'pt_BR' });
f.location.city();  // "Goiânia"
f.color.human();    // "azul"`}</Code>

      <p>Quando uma chave não existe no locale escolhido, o valor cai para <code className="inline">en</code> automaticamente, então você nunca recebe <code className="inline">undefined</code>. Locale desconhecido lança erro no momento da criação.</p>
    </article>
  );
}
