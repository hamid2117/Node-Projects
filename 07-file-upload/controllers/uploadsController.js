const Product = require('../models/Product')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError } = require('../errors')
const path = require('path')
const uploadProductImage = async (req, res) => {
  if (!req.files) {
    throw new BadRequestError('No File is uploaded')
  }

  const productImage = req.files.image

  if (!productImage.mimetype.startsWith('image')) {
    throw new BadRequestError('Please upload Image')
  }
  const maxSize = 100000

  if (productImage.size > maxSize) {
    throw new BadRequestError('please upload image under smaller 100KB')
  }
  const imagePath = path.join(
    __dirname,
    '../public/uploads/' + `${productImage.name}`
  )

  await productImage.mv(imagePath) // error will handle by our middlware

  res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${productImage.name}` } })
}

module.exports = uploadProductImage
