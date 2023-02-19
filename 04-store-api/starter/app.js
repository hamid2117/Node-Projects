require('dotenv').config()
require('express-async-errors')

const express = require('express')
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const productsRouter = require('./routes/products')

const app = express()

//database connection
require('./db/connect')

//middleware
app.use(express.json())

//api

app.use('/api/v1/products', productsRouter)

app.use(notFoundMiddleware)
// express rule errror handler in last  and error handler in last bcs after throw new Error  next line will not be exceuted
app.use(errorHandlerMiddleware)

module.exports = app
