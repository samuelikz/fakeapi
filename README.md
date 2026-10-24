# @samuelikz/fakegen

Gerador de dados de exemplo para JavaScript. Sem dependências, determinístico com seed, com locales (`en`, `pt_BR`) e data de referência fixa para testes reproduzíveis.

> Status: 0.1.x, inicial. A API pode mudar antes da 1.0. Veja o [CHANGELOG](CHANGELOG.md).

## Instalação

```bash
npm install @samuelikz/fakegen
```

Requer Node.js 18 ou superior.

## Uso

```js
const { createFaker, faker } = require('@samuelikz/fakegen');

// Reprodutível: mesmo seed, mesma saída
const f = createFaker({ seed: 42, locale: 'pt_BR', referenceDate: '2025-06-15' });

f.person.fullName();            // "Gabriel Oliveira"
f.internet.email();             // "diegosilva@mail.test"
f.location.zipCode();           // "75386-366"
f.phone.number();               // "(75) 73044-0349"
f.br.cpf({ formatted: true });  // "081.234.929-60" (dígitos verificadores válidos)
f.date.past({ days: 30 });      // 2025-05-22T00:28:07.382Z
f.finance.creditCardNumber();   // "4757837469622601" (passa no Luhn)

// Instância padrão, sem seed (cada execução gera valores diferentes)
faker.number.int({ min: 1, max: 10 });
```

Os valores acima são exemplos reais com `seed: 42`. A saída exata depende da versão do pacote (veja [Estabilidade](#estabilidade-da-saída)).

## Opções de `createFaker`

| Opção | Padrão | Descrição |
|-------|--------|-----------|
| `seed` | `Date.now()` | Semente. Mesma semente, mesmo locale e mesma versão do algoritmo geram a mesma sequência. |
| `locale` | `'en'` | `'en'` ou `'pt_BR'`. Chaves que faltam num locale caem para `en`. |
| `referenceDate` | agora | Data fixa usada por `date.past`, `date.future`, `date.recent` e `date.birthdate`. |

Locale desconhecido lança erro.

## Módulos

| Módulo | Métodos |
|--------|---------|
| `person` | `firstName`, `lastName`, `fullName`, `jobTitle`, `sex` |
| `internet` | `email`, `userName`, `domainName`, `url`, `ipv4`, `password` |
| `location` | `city`, `state`, `country`, `streetAddress`, `zipCode` |
| `phone` | `number` |
| `date` | `between`, `past`, `future`, `recent`, `birthdate` |
| `number` | `int`, `float`, `digits`, `bigInt` |
| `string` | `alpha`, `alphanumeric`, `hexadecimal`, `uuid` |
| `lorem` | `words`, `sentence`, `paragraph` |
| `br` | `cpf`, `cnpj` (com dígitos verificadores) |
| `commerce` | `productName`, `department`, `price` |
| `finance` | `currencyCode`, `amount`, `accountNumber`, `creditCardNumber` (`visa` ou `mastercard`) |
| `color` | `human`, `hex`, `rgb`, `hsl` |
| `image` | `url`, `avatar` (placeholders determinísticos) |
| `company` | `name`, `catchPhrase` |
| `system` | `fileName`, `fileExtension`, `mimeType`, `semver` |

Métodos de `date` com `referenceDate` ausente usam o relógio atual, então a saída não é reproduzível nesse caso.

## Estabilidade da saída

- Para um seed fixo, a saída só muda quando `Faker.ALGORITHM_VERSION` muda. A constante fica em `src/random.js` e é exposta como `Faker.ALGORITHM_VERSION`.
- Mudanças que alteram a sequência de um seed são breaking change: sobem a versão major e entram no CHANGELOG.
- Dados de locale (nomes, cidades etc.) também fazem parte da saída. Alterá-los muda os valores de um seed, então o pacote os trata como parte do contrato.
- Os testes em `tests/contract.test.js` travam a saída de seeds fixos para `en` e `pt_BR`.

Para testes do seu projeto, fixe a versão do pacote no lockfile.

## Desenvolvimento

```bash
npm install
npm test        # node --test, sem dependências de teste
```

Estrutura: `src/faker.js` (classe `Faker`), `src/random.js` (PRNG), `src/modules/*` (um arquivo por categoria), `src/locales/*` (dados por locale).

## Licença

MIT, veja [LICENSE](LICENSE).
