const DAY = 24 * 60 * 60 * 1000;

module.exports = f => {
  const now = () => (f.referenceDate ? f.referenceDate.getTime() : Date.now());

  const between = ({ from, to }) => {
    const a = new Date(from).getTime();
    const b = new Date(to).getTime();
    if (b < a) throw new Error('between(): "to" é anterior a "from"');
    return new Date(a + f.random() * (b - a));
  };

  return {
    between,
    past: ({ days = 365 } = {}) => between({ from: now() - days * DAY, to: now() }),
    future: ({ days = 365 } = {}) => between({ from: now(), to: now() + days * DAY }),
    recent: ({ days = 1 } = {}) => between({ from: now() - days * DAY, to: now() }),
    birthdate: ({ minAge = 18, maxAge = 80 } = {}) => {
      const ref = new Date(now());
      const from = new Date(ref);
      from.setFullYear(ref.getFullYear() - maxAge - 1);
      const to = new Date(ref);
      to.setFullYear(ref.getFullYear() - minAge);
      return between({ from, to });
    },
  };
};
