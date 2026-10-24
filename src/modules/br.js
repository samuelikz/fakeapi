// Documentos brasileiros com dígitos verificadores válidos (CPF e CNPJ).
function checkDigit(digits, weights) {
  const sum = digits.reduce((s, d, i) => s + d * weights[i], 0);
  const r = sum % 11;
  return r < 2 ? 0 : 11 - r;
}

module.exports = f => {
  const digitsOf = n => Array.from({ length: n }, () => f.int({ min: 0, max: 9 }));
  return {
    cpf: ({ formatted = false } = {}) => {
      const base = digitsOf(9);
      const d1 = checkDigit(base, [10, 9, 8, 7, 6, 5, 4, 3, 2]);
      const d2 = checkDigit([...base, d1], [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]);
      const s = [...base, d1, d2].join('');
      return formatted ? `${s.slice(0, 3)}.${s.slice(3, 6)}.${s.slice(6, 9)}-${s.slice(9)}` : s;
    },
    cnpj: ({ formatted = false } = {}) => {
      const base = digitsOf(8).concat([0, 0, 0, 1]); // filial 0001
      const d1 = checkDigit(base, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
      const d2 = checkDigit([...base, d1], [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
      const s = [...base, d1, d2].join('');
      return formatted
        ? `${s.slice(0, 2)}.${s.slice(2, 5)}.${s.slice(5, 8)}/${s.slice(8, 12)}-${s.slice(12)}`
        : s;
    },
  };
};
