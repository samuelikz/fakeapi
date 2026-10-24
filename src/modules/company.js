module.exports = f => ({
  name: () => `${f.person.lastName()} ${f.pick(f.data('companySuffixes'))}`,
  catchPhrase: () =>
    `${f.pick(f.data('catchPhraseAdjectives'))} ${f.pick(f.data('catchPhraseNouns'))}`,
});
