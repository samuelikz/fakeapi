# @samuelikz/fakegen

Gerador de dados de exemplo para JavaScript: sem dependências, determinístico com seed, com locales e data de referência fixa para testes reproduzíveis.

> Status: 0.1.0, versão inicial. A API ainda pode mudar antes da 1.0.

## Instalação

```bash
npm install @samuelikz/fakegen
```

## Uso

```js
const { createFaker, faker } = require('@samuelikz/fakegen');

// Reprodutível: mesmo seed, mesma saída
const f = createFaker({ seed: 42, locale: 'pt_BR', referenceDate: '2025-06-15' });

f.person.fullName();          // "Carlos Silva"
f.internet.email();           // "carlos.silva@exemplo.com.br"
f.location.zipCode();         // "01310-100"
f.phone.number();             // "(11) 98765-4321"
f.date.past({ days: 30 });    // Date entre 15/05 e 15/06 de 2025
f.br.cpf({ formatted: true }); // "123.456.789-09" (dígitos válidos)
f.string.uuid();              // UUID v4

// Instância padrão, não determinística
faker.number.int({ min: 1, max: 10 });
```

## Opções

| Opção | Padrão | Descrição |
|-------|--------|-----------|
| `seed` | `Date.now()` | Semente. Mesma semente e mesma `ALGORITHM_VERSION` geram a mesma sequência. |
| `locale` | `'en'` | `'en'` ou `'pt_BR'`. Chaves ausentes caem para `en`. |
| `referenceDate` | agora | Data fixa usada por `date.past/future/recent/birthdate`. |

## Módulos

- `person`: `firstName`, `lastName`, `fullName`, `jobTitle`, `sex`
- `internet`: `email`, `userName`, `domainName`, `url`, `ipv4`, `password`
- `location`: `city`, `state`, `country`, `streetAddress`, `zipCode`
- `phone`: `number`
- `date`: `between`, `past`, `future`, `recent`, `birthdate`
- `number`: `int`, `float`, `digits`, `bigInt`
- `string`: `alpha`, `alphanumeric`, `hexadecimal`, `uuid`
- `lorem`: `words`, `sentence`, `paragraph`
- `br`: `cpf`, `cnpj` (com dígitos verificadores)
- `commerce`: `productName`, `department`, `price`
- `finance`: `currencyCode`, `amount`, `accountNumber`, `creditCardNumber` (Luhn válido; visa e mastercard)
- `color`: `human`, `hex`, `rgb`, `hsl`
- `image`: `url`, `avatar` (placeholders determinísticos)
- `company`: `name`, `catchPhrase`
- `system`: `fileName`, `fileExtension`, `mimeType`, `semver`

## Estabilidade da saída

A sequência gerada depende de `ALGORITHM_VERSION` (exportada em `src/random.js`). Ela só muda em versão major do pacote, e a mudança é documentada no changelog. Para testes, prefira fixar a versão do pacote no lockfile.

## Desenvolvimento

```bash
npm test
```

## Licença

MIT, veja [LICENSE](LICENSE).
