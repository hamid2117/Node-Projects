const Product = require('../models/Product')
const { StatusCodes } = require('http-status-codes')
const path = require('path')
const uploadProductImage = async (req, res) => {
  const productImage = req.files.image

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
