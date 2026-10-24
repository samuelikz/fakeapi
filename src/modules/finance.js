// Número de cartão válido pelo algoritmo de Luhn.
function luhnCheckDigit(digits) {
  let sum = 0;
  digits.forEach((d, i) => {
    // Dobra os dígitos nas posições pares contadas a partir do fim (o dígito verificador ainda não existe).
    let v = (digits.length - i) % 2 === 1 ? d * 2 : d;
    sum += v > 9 ? v - 9 : v;
  });
  return (10 - (sum % 10)) % 10;
}

const PREFIXES = { visa: [4], mastercard: [5, 1] };

module.exports = f => ({
  currencyCode: () => f.pick(f.data('currencyCodes')),
  amount: ({ min = 1, max = 10000, dec = 2 } = {}) => Number(f.float({ min, max, precision: 10 ** -dec }).toFixed(dec)),
  accountNumber: (digits = 8) => f.fromFormat('#'.repeat(digits)),
  creditCardNumber: ({ issuer = 'visa', formatted = false } = {}) => {
    const prefix = PREFIXES[issuer];
    if (!prefix) throw new Error(`Emissor não suportado: ${issuer}`);
    const head = issuer === 'mastercard'
      ? [5, f.int({ min: 1, max: 5 })]
      : prefix.slice();
    const body = [...head, ...Array.from({ length: 15 - head.length }, () => f.int({ min: 0, max: 9 }))];
    const digits = [...body, luhnCheckDigit(body)].join('');
    return formatted ? digits.replace(/(.{4})/g, '$1 ').trim() : digits;
  },
});
