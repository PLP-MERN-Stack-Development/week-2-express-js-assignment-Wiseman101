// routes/products.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

const auth = require('../middleware/auth');

router.post('/', auth, productController.createProduct);
router.put('/:id', auth, productController.updateProduct);
router.delete('/:id', auth, productController.deleteProduct);

const validate = require('../middleware/validateProduct');

router.post('/', auth, validate, productController.createProduct);
router.put('/:id', auth, validate, productController.updateProduct);

router.get('/stats', productController.getProductStats);




module.exports = router;
