const { Random, ALGORITHM_VERSION } = require('./random');
const locales = { en: require('./locales/en'), pt_BR: require('./locales/pt_BR') };
const modules = {
  person: require('./modules/person'),
  internet: require('./modules/internet'),
  location: require('./modules/location'),
  phone: require('./modules/phone'),
  date: require('./modules/date'),
  number: require('./modules/number'),
  string: require('./modules/string'),
  lorem: require('./modules/lorem'),
  br: require('./modules/br'),
  commerce: require('./modules/commerce'),
  finance: require('./modules/finance'),
  color: require('./modules/color'),
  image: require('./modules/image'),
  company: require('./modules/company'),
  system: require('./modules/system'),
};

class Faker {
  /**
   * @param {object} [opts]
   * @param {string|number} [opts.seed] Sem seed, a saída muda a cada execução.
   * @param {'en'|'pt_BR'} [opts.locale='en']
   * @param {string|Date} [opts.referenceDate] Data fixa usada por date.*; sem ela, "agora" é usado.
   */
  constructor({ seed = Date.now(), locale = 'en', referenceDate } = {}) {
    if (!locales[locale]) throw new Error(`Locale não suportado: ${locale}`);
    this.locale = locale;
    this.referenceDate = referenceDate ? new Date(referenceDate) : null;
    this.seed(seed);
    for (const [name, factory] of Object.entries(modules)) this[name] = factory(this);
  }

  seed(value) {
    this.rng = new Random(value);
    return this;
  }

  // Dados do locale atual, com fallback para 'en' quando a chave não existe.
  data(key) {
    const v = locales[this.locale][key];
    return v !== undefined ? v : locales.en[key];
  }

  random() {
    return this.rng.next();
  }

  int({ min = 0, max = 2147483647 } = {}) {
    return Math.floor(this.random() * (max - min + 1)) + min;
  }

  float({ min = 0, max = 1, precision = 0.01 } = {}) {
    const steps = Math.floor((max - min) / precision);
    return Number((min + this.int({ min: 0, max: steps }) * precision).toFixed(10));
  }

  bool(probability = 0.5) {
    return this.random() < probability;
  }

  pick(list) {
    if (!list.length) throw new Error('pick() recebeu lista vazia');
    return list[Math.floor(this.random() * list.length)];
  }

  shuffle(list) {
    const out = [...list];
    for (let i = out.length - 1; i > 0; i--) {
      const j = Math.floor(this.random() * (i + 1));
      [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
  }

  // Escolha ponderada: weights = [['a', 3], ['b', 1]]
  weighted(pairs) {
    const total = pairs.reduce((s, [, w]) => s + w, 0);
    let r = this.random() * total;
    for (const [value, w] of pairs) {
      if ((r -= w) < 0) return value;
    }
    return pairs[pairs.length - 1][0];
  }

  // Formato com '#' = dígito aleatório, '?' = letra aleatória (A-Z).
  fromFormat(format) {
    return format.replace(/[#?]/g, c =>
      c === '#' ? String(this.int({ min: 0, max: 9 })) : String.fromCharCode(65 + this.int({ min: 0, max: 25 })),
    );
  }
}

Faker.ALGORITHM_VERSION = ALGORITHM_VERSION;

module.exports = { Faker };
