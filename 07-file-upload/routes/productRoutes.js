const express = require('express')
const router = express.Router()

const uploadProductImage = require('../controllers/uploadsController')
const {
  createProduct,
  getAllProducts,
} = require('../controllers/productController')

router.route('/').get(getAllProducts).post(createProduct)
router.post('/uploads', uploadProductImage)

module.exports = router
