const express = require('express')
const cors = require('cors')
const { boomErrorHandler, logErrors, errorHandler } = require('./middlewares/error.handler.js')
const { routerApi } = require('./router/index.router.js')

const app = express()

/* const whitelist = ['http://localhost:3000', 'https://alexisklisch.com', 'https://www.alexisklisch.com']
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('no permitido'))
    }
  }
}
app.use(cors(options)) */
app.use(cors())
app.use(express.json())
routerApi(app)

require('./utils/auth')

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

const listener = app.listen(3001, () => {
  console.log(`Escuchando en el puerto ${listener.address().port}`)
})
