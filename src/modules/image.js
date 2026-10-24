// URLs de imagem placeholder determinísticas (picsum.photos aceita um seed na URL).
module.exports = f => ({
  url: ({ width = 640, height = 480 } = {}) =>
    `https://picsum.photos/seed/${f.string.alphanumeric(8)}/${width}/${height}`,
  avatar: () => `https://picsum.photos/seed/${f.string.alphanumeric(8)}/96/96`,
});
