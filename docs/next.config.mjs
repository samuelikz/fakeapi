// Gera o site como estático (HTML prontos em dist/client), publicável em Pages
// sem servidor. `trailingSlash` gera saída em diretório (pasta/index.html + index.txt),
// que dá URL canônica estável e faz a navegação suave funcionar nos hosts estáticos.
// DOCS_BASE_PATH=/fakeapi prefixa rotas, links e assets para deploys em subpasta
// (GitHub Pages de projeto). Remova a opção `output` se quiser SSR.
const basePath = process.env.DOCS_BASE_PATH;

export default {
  output: 'export',
  trailingSlash: true,
  ...(basePath ? { basePath } : {}),
};
