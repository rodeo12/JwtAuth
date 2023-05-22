const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authenticateToken = require('../middleware/auth');
const authorize = require('../middleware/authorize');

router.get('/', authenticateToken, productController.getProducts);
router.post('/', authenticateToken, authorize('seller'), productController.addProduct);
router.delete('/:productId', authenticateToken, authorize('seller'), productController.deleteProduct);

module.exports = router;
