const express = require('express')
const { getProducts, getProductsStatic } = require('../controllers/products')
const router = express.Router()

router.route('/').get(getProducts)
router.route('/static').get(getProductsStatic)

module.exports = router
