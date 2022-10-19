const Product = require('../models/Product')
const { StatusCodes } = require('http-status-codes')

const createProduct = async (req, res) => {
  const product = await Product.create(req.body)
  res.status(StatusCodes.CREATED).json({ product })
}
const getAllProducts = async (req, res) => {
  res.send('Get All Product')

  res.status(StatusCodes.OK).send('All Products')
}

module.exports = {
  createProduct,
  getAllProducts,
}
