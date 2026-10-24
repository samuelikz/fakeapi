module.exports = f => ({
  city: () => f.pick(f.data('cities')),
  state: () => f.pick(f.data('states')),
  country: () => f.pick(f.data('countries')),
  streetAddress: () => `${f.int({ min: 1, max: 9999 })} ${f.pick(f.data('streetNames'))}`,
  zipCode: () => f.fromFormat(f.data('zipFormat')),
});
