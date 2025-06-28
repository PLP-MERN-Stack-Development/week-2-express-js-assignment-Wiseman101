// controllers/productController.js
const Product = require('../models/product');

exports.getAllProducts = (req, res) => {
  let { category, search, page = 1, limit = 10 } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);

  let data = Product.getAll();

  
  if (category) {
    data = data.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  
  if (search) {
    const term = search.toLowerCase();
    data = data.filter(p => p.name.toLowerCase().includes(term));
  }

  
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = data.slice(startIndex, endIndex);

  res.json({
    total: data.length,
    page,
    limit,
    data: paginatedData
  });
};


// GET one
exports.getProductById = (req, res) => {
  const product = Product.getById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
};

// POST
exports.createProduct = (req, res) => {
  const newProduct = Product.create(req.body);
  res.status(201).json(newProduct);
};

// PUT
exports.updateProduct = (req, res) => {
  const updated = Product.update(req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: 'Product not found' });
  res.json(updated);
};

// DELETE
exports.deleteProduct = (req, res) => {
  const deleted = Product.delete(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Product not found' });
  res.json(deleted);
};

const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');

exports.getProductStats = (req, res) => {
  const data = Product.getAll();
  const stats = {};

  for (const product of data) {
    const cat = product.category;
    if (stats[cat]) {
      stats[cat]++;
    } else {
      stats[cat] = 1;
    }
  }

  res.json({ countByCategory: stats });
};
