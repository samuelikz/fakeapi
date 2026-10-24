module.exports = f => ({
  number: () => f.fromFormat(f.data('phoneFormat')),
});
