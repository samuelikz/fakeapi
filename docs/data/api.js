// Dados da API de @samuelikz/fakegen, extraídos do código-fonte (src/modules/*).
// Cada módulo é uma factory que recebe a instância `f` do Faker.
export const modules = [
  {
    slug: 'person',
    title: 'person',
    description: 'Nomes, cargos e sexo de pessoas. Todo o conteúdo vem do locale atual (`en` ou `pt_BR`).',
    methods: [
      { name: 'firstName', signature: 'firstName(sex?)', params: [['sex', "string | null", "'female' ou 'male'. Sem argumento, escolhe aleatoriamente."]], returns: 'string', example: "f.person.firstName(); // \"Gabriel\"" },
      { name: 'lastName', signature: 'lastName()', params: [], returns: 'string', example: "f.person.lastName(); // \"Oliveira\"" },
      { name: 'fullName', signature: 'fullName(sex?)', params: [['sex', "string | null", "Opcional, força o primeiro nome de um sexo."]], returns: 'string', example: "f.person.fullName(); // \"Gabriel Oliveira\"" },
      { name: 'jobTitle', signature: 'jobTitle()', params: [], returns: 'string', example: "f.person.jobTitle(); // \"Analista de sistemas\"" },
      { name: 'sex', signature: 'sex()', params: [], returns: "'female' | 'male'", example: "f.person.sex(); // \"male\"" },
    ],
  },
  {
    slug: 'internet',
    title: 'internet',
    description: 'E-mails, nome de usuário, domínios, URLs, IPv4 e senhas.',
    methods: [
      { name: 'userName', signature: 'userName(first?, last?)', params: [['first, last', 'string', 'Opcional. Sem eles, gera a partir de person.firstName/lastName. Pode receber sufixo numérico (30% de chance).']], returns: 'string', example: "f.internet.userName(); // \"gabriel.oliveira42\"" },
      { name: 'email', signature: 'email({ firstName?, lastName?, provider? }?)', params: [['firstName, lastName', 'string', 'Usados no nome de usuário antes do @.'], ['provider', 'string', 'Domínio do e-mail. Padrão: domínio aleatório do locale.']], returns: 'string', example: "f.internet.email(); // \"diegosilva@mail.test\"" },
      { name: 'domainName', signature: 'domainName()', params: [], returns: 'string', example: "f.internet.domainName(); // \"oliveira.com\"" },
      { name: 'url', signature: 'url()', params: [], returns: 'string', example: "f.internet.url(); // \"https://oliveira.net/\"" },
      { name: 'ipv4', signature: 'ipv4()', params: [], returns: 'string', example: "f.internet.ipv4(); // \"174.162.98.203\"" },
      { name: 'password', signature: 'password({ length? }?)', params: [['length', 'number', 'Padrão: 16.']], returns: 'string', example: "f.internet.password(); // \"k8!fQz0mR2#pLx9d\"" },
    ],
  },
  {
    slug: 'location',
    title: 'location',
    description: 'Cidades, estados, países, endereços e CEPs no formato do locale.',
    methods: [
      { name: 'city', signature: 'city()', params: [], returns: 'string', example: "f.location.city(); // \"Goiânia\"" },
      { name: 'state', signature: 'state()', params: [], returns: 'string', example: "f.location.state(); // \"Goiás\"" },
      { name: 'country', signature: 'country()', params: [], returns: 'string', example: "f.location.country(); // \"Brasil\"" },
      { name: 'streetAddress', signature: 'streetAddress()', params: [], returns: 'string', example: "f.location.streetAddress(); // \"3841 Rua das Palmeiras\"" },
      { name: 'zipCode', signature: 'zipCode()', params: [], returns: 'string', example: "f.location.zipCode(); // \"75386-366\"" },
    ],
  },
  {
    slug: 'phone',
    title: 'phone',
    description: 'Telefones no formato do locale.',
    methods: [
      { name: 'number', signature: 'number()', params: [], returns: 'string', example: "f.phone.number(); // \"(75) 73044-0349\"" },
    ],
  },
  {
    slug: 'date',
    title: 'date',
    description: 'Datas relativas a uma referência. Usa `referenceDate` da instância quando definida; sem ela, usa o relógio atual (a saída deixa de ser reproduzível).',
    methods: [
      { name: 'between', signature: 'between({ from, to })', params: [['from, to', 'string | Date', 'Intervalo (obrigatório). `to` anterior a `from` lança erro.']], returns: 'Date', example: "f.date.between({ from: '2025-01-01', to: '2025-06-30' });" },
      { name: 'past', signature: 'past({ days? }?)', params: [['days', 'number', 'Padrão: 365. Janela no passado.', ]], returns: 'Date', example: "f.date.past({ days: 30 }); // 2025-05-22T00:28:07.382Z" },
      { name: 'future', signature: 'future({ days? }?)', params: [['days', 'number', 'Padrão: 365. Janela no futuro.']], returns: 'Date', example: "f.date.future({ days: 30 });" },
      { name: 'recent', signature: 'recent({ days? }?)', params: [['days', 'number', 'Padrão: 1. Nas últimas 24 h por padrão.']], returns: 'Date', example: "f.date.recent();" },
      { name: 'birthdate', signature: 'birthdate({ minAge?, maxAge? }?)', params: [['minAge', 'number', 'Padrão: 18.'], ['maxAge', 'number', 'Padrão: 80.']], returns: 'Date', example: "f.date.birthdate({ minAge: 20, maxAge: 40 });" },
    ],
  },
  {
    slug: 'number',
    title: 'number',
    description: 'Números inteiros, decimais e grandes.',
    methods: [
      { name: 'int', signature: 'int({ min?, max? }?)', params: [['min', 'number', 'Padrão: 0.'], ['max', 'number', 'Padrão: 2147483647.']], returns: 'number', example: "f.number.int({ min: 1, max: 10 }); // 7" },
      { name: 'float', signature: 'float({ min?, max?, precision? }?)', params: [['min, max', 'number', 'Padrão: 0..1.'], ['precision', 'number', 'Padrão: 0.01. Tempo de incremento.']], returns: 'number', example: "f.number.float({ min: 0, max: 1 }); // 0.37" },
      { name: 'digits', signature: 'digits(length?)', params: [['length', 'number', 'Padrão: 6.']], returns: 'string', example: "f.number.digits(4); // \"0973\"" },
      { name: 'bigInt', signature: 'bigInt({ digits? }?)', params: [['digits', 'number', 'Padrão: 18 dígitos.']], returns: 'bigint', example: "f.number.bigInt(); // 48xxxxxxxxxxxxxxxxn" },
    ],
  },
  {
    slug: 'string',
    title: 'string',
    description: 'Sequências de caracteres e UUID v4.',
    methods: [
      { name: 'alpha', signature: 'alpha(length?)', params: [['length', 'number', 'Padrão: 10. Apenas a a z.']], returns: 'string', example: "f.string.alpha(5); // \"kqxrb\"" },
      { name: 'alphanumeric', signature: 'alphanumeric(length?)', params: [['length', 'number', 'Padrão: 10.']], returns: 'string', example: "f.string.alphanumeric(8); // \"kq7xrb31\"" },
      { name: 'hexadecimal', signature: 'hexadecimal(length?)', params: [['length', 'number', 'Padrão: 8.']], returns: 'string', example: "f.string.hexadecimal(); // \"a3f91bc7\"" },
      { name: 'uuid', signature: 'uuid()', params: [], returns: 'string', example: "f.string.uuid(); // \"a3f91bc7-8d64-4d2e-9a8b-1f2c3d4e5f60\"" },
    ],
  },
  {
    slug: 'lorem',
    title: 'lorem',
    description: 'Texto falso no idioma do locale.',
    methods: [
      { name: 'words', signature: 'words(count?)', params: [['count', 'number', 'Padrão: 3.']], returns: 'string[]', example: "f.lorem.words(4); // [\"amet\", \"sit\", \"lorem\", \"dolor\"]" },
      { name: 'sentence', signature: 'sentence({ words? }?)', params: [['words', 'number', 'Padrão: 4 a 10 (aleatório).']], returns: 'string', example: "f.lorem.sentence(); // \"Sit dolor lorem amet.\"" },
      { name: 'paragraph', signature: 'paragraph({ sentences? }?)', params: [['sentences', 'number', 'Padrão: 3.']], returns: 'string', example: "f.lorem.paragraph(); // \"Sit dolor ... Lorem ipsum.\"" },
    ],
  },
  {
    slug: 'br',
    title: 'br',
    description: 'Documentos brasileiros com dígitos verificadores válidos (matematicamente corretos, mas fictícios).',
    methods: [
      { name: 'cpf', signature: 'cpf({ formatted? }?)', params: [['formatted', 'boolean', 'Padrão: `false` (só dígitos). Com `true`: `000.000.000-00`.']], returns: 'string', example: "f.br.cpf({ formatted: true }); // \"081.234.929-60\"" },
      { name: 'cnpj', signature: 'cnpj({ formatted? }?)', params: [['formatted', 'boolean', 'Padrão: `false`. Filial sempre `0001`.']], returns: 'string', example: "f.br.cnpj({ formatted: true }); // \"57.123.852/0001-60\"" },
    ],
  },
  {
    slug: 'commerce',
    title: 'commerce',
    description: 'Produtos, departamentos e preços.',
    methods: [
      { name: 'productName', signature: 'productName()', params: [], returns: 'string', example: "f.commerce.productName(); // \"Ergonomic Wooden Mouse\"" },
      { name: 'department', signature: 'department()', params: [], returns: 'string', example: "f.commerce.department(); // \"Eletrônicos\"" },
      { name: 'price', signature: 'price({ min?, max? }?)', params: [['min, max', 'number', 'Padrão: 1..1000. Duas casas decimais.']], returns: 'number', example: "f.commerce.price(); // 485.29" },
    ],
  },
  {
    slug: 'finance',
    title: 'finance',
    description: 'Moeda, valores, números de conta e cartões de crédito (numero válido pelo Luhn).',
    methods: [
      { name: 'currencyCode', signature: 'currencyCode()', params: [], returns: 'string', example: "f.finance.currencyCode(); // \"BRL\"" },
      { name: 'amount', signature: 'amount({ min?, max?, dec? }?)', params: [['min, max', 'number', 'Padrão: 1..10000.'], ['dec', 'number', 'Padrão: 2 casas decimais.']], returns: 'number', example: "f.finance.amount(); // 2381.06" },
      { name: 'accountNumber', signature: 'accountNumber(digits?)', params: [['digits', 'number', 'Padrão: 8.']], returns: 'string', example: "f.finance.accountNumber(); // \"94857201\"" },
      { name: 'creditCardNumber', signature: 'creditCardNumber({ issuer?, formatted? }?)', params: [['issuer', "'visa' | 'mastercard'", 'Padrão: `visa`. Outro valor lança erro.'], ['formatted', 'boolean', '_padrao_: `false`. Com `true`, grupos de 4 separados por espaço.']], returns: 'string', example: "f.finance.creditCardNumber(); // \"4757837469622601\"" },
    ],
  },
  {
    slug: 'color',
    title: 'color',
    description: 'Cores em nomes e formatos CSS.',
    methods: [
      { name: 'human', signature: 'human()', params: [], returns: 'string', example: "f.color.human(); // \"azul\"" },
      { name: 'hex', signature: 'hex()', params: [], returns: 'string', example: "f.color.hex(); // \"#3fa2c1\"" },
      { name: 'rgb', signature: 'rgb()', params: [], returns: 'string', example: "f.color.rgb(); // \"rgb(63, 162, 193)\"" },
      { name: 'hsl', signature: 'hsl()', params: [], returns: 'string', example: "f.color.hsl(); // \"hsl(197, 50%, 50%)\"" },
    ],
  },
  {
    slug: 'image',
    title: 'image',
    description: 'URLs de imagem placeholder determinísticas (picsum.photos, via seed na URL).',
    methods: [
      { name: 'url', signature: 'url({ width?, height? }?)', params: [['width', 'number', 'Padrão: 640.'], ['height', 'number', 'Padrão: 480.']], returns: 'string', example: "f.image.url(); // \"https://picsum.photos/seed/a3f91bc7/640/480\"" },
      { name: 'avatar', signature: 'avatar()', params: [], returns: 'string', example: "f.image.avatar(); // \"https://picsum.photos/seed/a3f91bc7/96/96\"" },
    ],
  },
  {
    slug: 'company',
    title: 'company',
    description: 'Nomes de empresa e frases de efeito.',
    methods: [
      { name: 'name', signature: 'name()', params: [], returns: 'string', example: "f.company.name(); // \"Oliveira S.A.\"" },
      { name: 'catchPhrase', signature: 'catchPhrase()', params: [], returns: 'string', example: "f.company.catchPhrase(); // \"Inovação transparente\"" },
    ],
  },
  {
    slug: 'system',
    title: 'system',
    description: 'Arquivos, MIME types e versões.',
    methods: [
      { name: 'fileName', signature: 'fileName({ ext? }?)', params: [['ext', 'string', 'Extensão opcional; padrão: escolhida entre as MIME conhecidas.']], returns: 'string', example: "f.system.fileName(); // \"kqxrbfqzme.pdf\"" },
      { name: 'fileExtension', signature: 'fileExtension()', params: [], returns: 'string', example: "f.system.fileExtension(); // \"pdf\"" },
      { name: 'mimeType', signature: 'mimeType(ext?)', params: [['ext', 'string', 'Extensão opcional; sem ela, uma extensão é sorteada.']], returns: 'string', example: "f.system.mimeType(); // \"application/pdf\"" },
      { name: 'semver', signature: 'semver()', params: [], returns: 'string', example: "f.system.semver(); // \"4.12.37\"" },
    ],
  },
];

// Instância base (métodos de baixo nível da classe Faker).
export const fakerCore = [
  { name: 'seed', signature: 'seed(value)', returns: 'Faker', description: 'Reinicia o PRNG com uma semente. Encadeável.', example: "f.seed(42);" },
  { name: 'random', signature: 'random()', returns: 'number', description: 'Próximo número em [0, 1).', example: "f.random(); // 0.3745..." },
  { name: 'int', signature: 'int({ min?, max? }?)', returns: 'number', description: 'Inteiro em [min, max].', example: "f.int({ min: 0, max: 9 });" },
  { name: 'float', signature: 'float({ min?, max?, precision? }?)', returns: 'number', description: 'Decimal em passos de `precision`.', example: "f.float({ min: 0, max: 1 });" },
  { name: 'bool', signature: 'bool(probability?)', returns: 'boolean', description: 'Verdadeiro com a probabilidade dada (padrão 0.5).', example: "f.bool(0.3);" },
  { name: 'pick', signature: 'pick(list)', returns: 'T', description: 'Item aleatório de uma lista. Lista vazia lança erro.', example: "f.pick(['a', 'b', 'c']);" },
  { name: 'shuffle', signature: 'shuffle(list)', returns: 'T[]', description: 'Cópia embaralhada (Fisher-Yates).', example: "f.shuffle([1, 2, 3]);" },
  { name: 'weighted', signature: 'weighted(pairs)', returns: 'T', description: 'Escolha ponderada; `pairs` = `[[valor, peso], ...]`.', example: "f.weighted([['comum', 9], ['raro', 1]]);" },
  { name: 'fromFormat', signature: 'fromFormat(format)', returns: 'string', description: 'Substitui `#` por dígito e `?` por letra A a Z.', example: "f.fromFormat('###.###.###-##');" },
  { name: 'data', signature: 'data(key)', returns: '*', description: 'Dado do locale atual, com fallback para `en`.', example: "f.data('firstNamesMale');" },
];

export const moduleBySlug = Object.fromEntries(modules.map(m => [m.slug, m]));
