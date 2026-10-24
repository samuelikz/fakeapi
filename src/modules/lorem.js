module.exports = f => {
  const words = (count = 3) => Array.from({ length: count }, () => f.pick(f.data('loremWords')));
  const sentence = ({ words: n = f.int({ min: 4, max: 10 }) } = {}) => {
    const w = words(n).join(' ');
    return w.charAt(0).toUpperCase() + w.slice(1) + '.';
  };
  return {
    words,
    sentence,
    paragraph: ({ sentences = 3 } = {}) => Array.from({ length: sentences }, () => sentence()).join(' '),
  };
};
