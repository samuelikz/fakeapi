const { slugify } = require('../util');

module.exports = f => {
  const userName = (first, last) => {
    const base = first && last ? `${first}.${last}` : `${f.person.firstName()}.${f.person.lastName()}`;
    return slugify(base) + (f.bool(0.3) ? f.int({ min: 1, max: 99 }) : '');
  };
  return {
    userName,
    email: ({ firstName, lastName, provider } = {}) => {
      const user = userName(firstName, lastName);
      return `${user}@${provider || f.pick(f.data('freeEmailDomains'))}`;
    },
    domainName: () => `${slugify(f.pick(f.data('lastNames')))}.${f.pick(['com', 'net', 'org', 'io'])}`,
    url: () => `https://${f.internet.domainName()}/`,
    ipv4: () => [0, 0, 0, 0].map(() => f.int({ min: 0, max: 255 })).join('.'),
    password: ({ length = 16 } = {}) => {
      const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%';
      return Array.from({ length }, () => chars[f.int({ min: 0, max: chars.length - 1 })]).join('');
    },
  };
};
