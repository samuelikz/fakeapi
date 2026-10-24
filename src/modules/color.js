const hex2 = n => n.toString(16).padStart(2, '0');

module.exports = f => {
  const rgb = () => [0, 0, 0].map(() => f.int({ min: 0, max: 255 }));
  return {
    human: () => f.pick(f.data('colorNames')),
    rgb: () => `rgb(${rgb().join(', ')})`,
    hex: () => `#${rgb().map(hex2).join('')}`,
    hsl: () => `hsl(${f.int({ min: 0, max: 360 })}, ${f.int({ min: 0, max: 100 })}%, ${f.int({ min: 0, max: 100 })}%)`,
  };
};
