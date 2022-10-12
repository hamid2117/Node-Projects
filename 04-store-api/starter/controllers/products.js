const ProductModel = require('../models/product')

const getProductsStatic = async (req, res) => {
  const products = await ProductModel.find()
  res.status(200).json({ products })
}
const getProducts = async (req, res) => {
  const { featured, name, company, sort, fields } = req.query

  const queryObj = {}

  if (featured) {
    queryObj.featured = featured === 'true' ? true : false
  }
  if (name) {
    queryObj.name = { $regex: name, $option: 'i' } // i indicate a = A
  }
  if (company) {
    queryObj.company = company
  }

  let result = ProductModel.find(queryObj)

  if (sort) {
    const sortList = sort.split(',').join(' ')
    result = result.sort(sortList)
  } else {
    result = result.sort('createdAt')
  }
  if (fields) {
    const fieldsList = fields.split(',').join(' ')
    result = result.select(fieldsList)
  }

  const products = await result

  res.status(200).json({ products })
}

module.exports = { getProducts, getProductsStatic }
