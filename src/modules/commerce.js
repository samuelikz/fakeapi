module.exports = f => ({
  productName: () => {
    const parts = {
      adjective: f.pick(f.data('productAdjectives')),
      material: f.pick(f.data('productMaterials')),
      product: f.pick(f.data('products')),
    };
    return f.data('productTemplate').replace(/\{(\w+)\}/g, (_, k) => parts[k]);
  },
  department: () => f.pick(f.data('departments')),
  price: ({ min = 1, max = 1000 } = {}) => Number(f.float({ min, max, precision: 0.01 }).toFixed(2)),
});
