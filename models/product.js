
let products = [];
let idCounter = 1;

module.exports = {
  getAll: () => products,

  getById: (id) => products.find(p => p.id === parseInt(id)),

  create: (product) => {
    const newProduct = { id: idCounter++, ...product };
    products.push(newProduct);
    return newProduct;
  },

  update: (id, updatedProduct) => {
    const index = products.findIndex(p => p.id === parseInt(id));
    if (index !== -1) {
      products[index] = { ...products[index], ...updatedProduct };
      return products[index];
    }
    return null;
  },

  delete: (id) => {
    const index = products.findIndex(p => p.id === parseInt(id));
    if (index !== -1) {
      return products.splice(index, 1)[0];
    }
    return null;
  }
};
