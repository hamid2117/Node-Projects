require('dotenv').config()
require('express-async-errors')

const express = require('express')
const path = require('path')
const app = express()
const fileUploader = require('express-fileupload')
// database
const connectDB = require('./db/connect')
// cloudinary
const cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
})
//router
const productRouter = require('./routes/productRoutes')

// error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(express.json())
app.use(
  fileUploader({
    useTempFiles: true,
  })
)

app.use(express.static(path.join(__dirname, './public')))

app.get('/', (req, res) => {
  res.send('<h1>File Upload Starter</h1>')
})
app.use('/api/v1/products', productRouter)

// middleware
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)

    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    )
  } catch (error) {
    console.log(error)
  }
}

start()
