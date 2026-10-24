module.exports = f => {
  const firstName = (sex) => {
    const s = sex || f.pick(['female', 'male']);
    return f.pick(s === 'female' ? f.data('firstNamesFemale') : f.data('firstNamesMale'));
  };
  const lastName = () => f.pick(f.data('lastNames'));
  return {
    firstName,
    lastName,
    fullName: (sex) => `${firstName(sex)} ${lastName()}`,
    jobTitle: () => f.pick(f.data('jobTitles')),
    sex: () => f.pick(['female', 'male']),
  };
};
