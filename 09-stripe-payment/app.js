require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

// controller
const stripRoute = require('./controllers/stripeController')
// error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const { get } = require('mongoose')

app.use(express.json())
app.use(express.static('./public'))

// stripe
app.post('/stripe', stripRoute)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    )
  } catch (error) {
    console.log(error)
  }
}

start()
