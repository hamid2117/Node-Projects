const ProductModel = require('./models/product')
const products = require('./products.json')
require('dotenv').config()
require('./db/connect')

const importData = async () => {
  try {
    await ProductModel.deleteMany()

    const createdProduct = await ProductModel.create(products)

    console.log(createdProduct)
    console.log('data Inserted !')
    process.exit()
  } catch (error) {
    console.error(`Your Error is : ${error}`)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await ProductModel.deleteMany()
    console.log('data is destroyed ')
    process.exit(0)
  } catch (error) {
    console.error(`Error of destroy Data is : ${error}`)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
