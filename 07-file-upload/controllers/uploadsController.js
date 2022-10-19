const Product = require('../models/Product')
const { StatusCodes } = require('http-status-codes')

const uploadProductImage = (req, res) => {
  res.status(StatusCodes.OK).send()
}

module.exports = uploadProductImage
