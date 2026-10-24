// Remove acentos e caracteres fora de [a-z0-9] para uso em e-mails/domínios.
function slugify(text) {
  return String(text)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
}

module.exports = { slugify };
