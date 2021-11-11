require('dotenv').config()
require('express-async-errors')
const express = require('express')
const connectDb = require('./db/connect')
const notFound = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')
const productsRouter = require('./routes/products')

const app = express()

// middleware
app.use(express.json())

// routes
app.get('/', (req, res) => {
  res.send('<h1>Store API</h1> <a href="/api/v1/products">products route </a>')
})

app.use('/api/v1/products', productsRouter)

app.use(errorHandler)
app.use(notFound)

const PORT = process.env.PORT || 3000

const start = async () => {
  try {
    await connectDb()
    app.listen(PORT, console.log(`listening on port ${PORT}`))
  } catch (error) {
    console.log(error)
  }
}

start()
