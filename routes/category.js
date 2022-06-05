const router = require('express').Router();

const { create } = require('../controllers/category');

router.post('/category', create);

module.exports = router;