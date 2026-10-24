module.exports = f => ({
  int: (opts) => f.int(opts),
  float: (opts) => f.float(opts),
  digits: (length = 6) => f.fromFormat('#'.repeat(length)),
  bigInt: ({ digits = 18 } = {}) => BigInt(f.fromFormat('#'.repeat(digits))),
});
