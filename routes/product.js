const router = require('express').Router();

// controller middlewares
const { create, productsCount, listAll } = require('../controllers/product');

// routes-endpoints product

router.post('/product', create);
router.get('/products/total', productsCount);
router.get('/products/:count', listAll);
// router.patch('/product/:slug', remove); // soft-delete
// router.delete('/product/:slug', remove2);  // no soft-delete
// router.get('/product/:slug', read);
// router.put('/product/:slug', update);

module.exports = router;