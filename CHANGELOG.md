# Changelog

## Unreleased

- PRNG com addon nativo em Rust (napi-rs, `native/`). Fallback automático para JS quando o addon não está compilado. Sequência idêntica nos dois backends.

## 0.1.0

Primeira versão do pacote, que substitui o servidor Express anterior do repositório.

- Gerador determinístico com seed (sfc32), com `ALGORITHM_VERSION` = 1.
- `referenceDate` para datas reproduzíveis.
- Locales `en` e `pt_BR`, com fallback para `en`.
- Categorias: `person`, `internet`, `location`, `phone`, `date`, `number`, `string`, `lorem`, `br`, `commerce`, `finance`, `color`, `image`, `company`, `system`.
- CPF e CNPJ com dígitos verificadores; cartões de crédito válidos pelo Luhn.
- Testes de contrato para seeds fixos.
