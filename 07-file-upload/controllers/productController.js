const Product = require('../models/Product')
const { StatusCodes } = require('http-status-codes')

const createProduct = async (req, res) => {
  res.status(StatusCodes.CREATED).send('create Product')
}
const getAllProducts = async (req, res) => {
  res.send('Get All Product')

  res.status(StatusCodes.OK).send('All Products')
}

module.exports = {
  createProduct,
  getAllProducts,
}
