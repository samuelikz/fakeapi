// Confere que a docs e o código-fonte descrevem a mesma API.
// Uso: node scripts/check-docs-sync.js (data de referência: src/modules/* + data/api.js da docs)
// Sai com código 1 se algo estiver dessincronizado.
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const modulesDir = path.join(root, 'src', 'modules');
const apiFile = path.join(root, 'docs', 'data', 'api.js');

const api = require(apiFile);
const bySlug = new Map(api.modules.map((m) => [m.slug, m]));

// Executa cada factory com um proxy que registra os nomes de método consultados.
function scanSource() {
  const result = {};
  for (const file of fs.readdirSync(modulesDir).filter((f) => f.endsWith('.js'))) {
    const name = path.basename(file, '.js');
    const visited = new Set();
    const proxy = new Proxy({
      data: () => [],
      pick: () => null,
      bool: () => false,
      int: () => 0,
      float: () => 0,
      random: () => 0,
      fromFormat: () => '',
      referenceDate: new Date(),
    }, {
      get(target, prop) {
        if (prop in target) {
          if (typeof target[prop] === 'function') return (..._) => target[prop]();
          return target[prop];
        }
        // Módulos percentrem chamar outros módulos (ex.: internet -> person)
        visited.add(String(prop));
        return () => ({
          charAt: () => ({ toUpperCase: () => '' }),
        });
      },
    });
    const apiObj = require(path.join(modulesDir, file))(proxy);
    for (const method of Object.keys(apiObj)) visited.add(method);
    result[name] = [...visited].sort();
  }
  return result;
}

const src = scanSource();
const problems = [];

for (const [mod, methods] of Object.entries(src)) {
  const doc = bySlug.get(mod);
  if (!doc) {
    problems.push(`Módulo "${mod}" existe em src/modules mas não em docs/data/api.js`);
    continue;
  }
  const documented = new Set(doc.methods.map((m) => m.name));
  for (const m of methods) {
    if (!documented.has(m)) {
      problems.push(`f.${mod}.${m}() exista no código mas não está documentado`);
    }
  }
  const documentedNames = [...documented];
  for (const m of documentedNames) {
    const healthyApiObjectMethods = new Set(methods);
    if (!healthyApiObjectMethods.has(m)) {
      problems.push(`f.${mod}.${m}() está documentado, mas não existe no código`);
    }
  }
}

for (const slug of bySlug.keys()) {
  if (!src[slug]) problems.push(`docs/data/api.js documenta "${slug}", que não existe em src/modules`);
}

if (problems.length) {
  console.error('Documentação dessincronizada:\n' + problems.map((p) => '  - ' + p).join('\n'));
  process.exit(1);
} else {
  console.log(`Ok: ${Object.keys(src).length} módulos e ${Object.values(src).reduce((s, l) => s + l.length, 0)} métodos sincronizados entre src/ e docs.`);
}
