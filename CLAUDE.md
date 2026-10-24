# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm test` — runs `node --test` (built-in runner, no dependencies). Single file: `node --test tests/faker.test.js`.

There is no lint script and no build step. The package ships `src/` as-is (CommonJS, Node >=18).

## Architecture

This repo is `@samuelikz/fakegen`, a zero-dependency fake-data generator library. It is not a server; the old Express API was removed.

- `src/faker.js` — `Faker` class. Owns the seeded RNG and the locale; attaches one object per module (`person`, `internet`, …) in the constructor. Module files export a factory `f => ({...})` that receives the instance and uses `f.random()`, `f.pick()`, `f.int()`, and `f.data(key)`.
- `src/random.js` — sfc32 PRNG seeded with FNV-1a. `ALGORITHM_VERSION` is mixed into the seed, so changing the generation algorithm changes all outputs and must bump it.
- `src/locales/*.js` — plain data objects per locale. `faker.data(key)` falls back to `en` for missing keys; add a new locale by adding a file and registering it in `src/faker.js`.
- `src/modules/br.js` — CPF/CNPJ with real check digits (`tests/` verifies them).
- `date.*` uses `referenceDate` when set; without it, output depends on the clock and is not reproducible.

Determinism is the core contract: any change that alters the sequence for an existing seed is a breaking change.
