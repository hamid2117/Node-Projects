const ProductModel = require('../models/product')

const getProductsStatic = async (req, res) => {
  const products = await ProductModel.find()
  res.status(200).json({ products })
}
const getProducts = async (req, res) => {
  const { featured, name, company, sort, fields, numericFilters } = req.query

  const queryObj = {}

  if (featured) {
    queryObj.featured = featured === 'true' ? true : false
  }
  if (name) {
    queryObj.name = { $regex: name, $options: 'i' } // i indicate a = A
  }
  if (company) {
    queryObj.company = company
  }
  if (numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    }
    const regEx = /\b(<|>|>=|<=|=)\b/g
    let filter = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    )
    const options = ['price', 'rating']
    filter = filter.split(',').map((item) => {
      const [field, operator, value] = item.split('-')
      if (options.includes(field)) {
        queryObj[field] = { [operator]: Number(value) }
      }
    })
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
  //Pagination functionality
  const limit = Number(req.query.limit) || 10
  const page = Number(req.query.page) || 1
  const skip = (page - 1) * limit

  result = result.limit(limit).skip(skip)

  const products = await result

  res.status(200).json({ products })
}

module.exports = { getProducts, getProductsStatic }
