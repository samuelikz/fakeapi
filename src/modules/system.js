const MIME = {
  pdf: 'application/pdf',
  png: 'image/png',
  jpg: 'image/jpeg',
  csv: 'text/csv',
  json: 'application/json',
  txt: 'text/plain',
};

module.exports = f => ({
  fileExtension: () => f.pick(Object.keys(MIME)),
  mimeType: (ext) => MIME[ext || f.pick(Object.keys(MIME))],
  fileName: ({ ext } = {}) => {
    const e = ext || f.pick(Object.keys(MIME));
    return `${f.string.alpha(f.int({ min: 5, max: 12 }))}.${e}`;
  },
  semver: () => `${f.int({ min: 0, max: 9 })}.${f.int({ min: 0, max: 20 })}.${f.int({ min: 0, max: 50 })}`,
});
