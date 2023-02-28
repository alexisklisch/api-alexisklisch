const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { boomErrorHandler, logErrors, errorHandler } = require('./middlewares/error.handler.js')
const { routerApi } = require('./router/index.router.js')
const config = require('../config.js')
const sslServer = require('../ssl/index.js')

const app = express()
app.use(cookieParser())
app.use((req, res, next) => {
  const { loginToken } = req.cookies
  if (loginToken) {
    req.headers.authorization = `Bearer ${loginToken}`
  }
  next()
})

const whitelist = ['http://localhost:3000', 'http://192.168.1.36:3000', 'https://alexisklisch.com', 'https://www.alexisklisch.com']
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('no permitido'))
    }
  },
  credentials: true
}
app.use(cors(options))
app.use(express.json())
routerApi(app)

require('./utils/auth')

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

if (config.env === 'development') {
  sslServer(app)
} else {
  const listener = app.listen(3001, () => {
    console.log(`Escuchando en el puerto ${listener.address().port}`)
  })
}
