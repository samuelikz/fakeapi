const ALPHA = 'abcdefghijklmnopqrstuvwxyz';
const ALNUM = ALPHA + '0123456789';

module.exports = f => {
  const chars = (set, length) => Array.from({ length }, () => set[f.int({ min: 0, max: set.length - 1 })]).join('');
  return {
    alpha: (length = 10) => chars(ALPHA, length),
    alphanumeric: (length = 10) => chars(ALNUM, length),
    hexadecimal: (length = 8) => chars('0123456789abcdef', length),
    uuid: () => {
      const hex = chars('0123456789abcdef', 32).split('');
      hex[12] = '4'; // versão 4
      hex[16] = '89ab'[f.int({ min: 0, max: 3 })]; // variante RFC 4122
      const s = hex.join('');
      return `${s.slice(0, 8)}-${s.slice(8, 12)}-${s.slice(12, 16)}-${s.slice(16, 20)}-${s.slice(20)}`;
    },
  };
};
