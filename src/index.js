const { Faker } = require('./faker');

module.exports = {
  Faker,
  createFaker: opts => new Faker(opts),
  // Instância padrão, não determinística (seed = agora). Para testes, crie uma com seed.
  faker: new Faker(),
};
