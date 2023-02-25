const express = require('express')
const { boomErrorHandler, logErrors, errorHandler } = require('./middlewares/error.handler.js')
const { routerApi } = require('./router/index.router.js')

const app = express()
app.use(express.json())
routerApi(app)

require('./utils/auth')

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

const listener = app.listen(3001, () => {
  console.log(`Escuchando en el puerto ${listener.address().port}`)
})
