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
app.use(errorHandlerMiddleware)

module.exports = app
