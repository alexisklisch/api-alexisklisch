const express = require('express')
const { routerApi } = require('./router/index.router.js')

const app = express()
app.use(express.json())
routerApi(app)

const listener = app.listen(3001, () => {
  console.log(`Escuchando en el puerto ${listener.address().port}`)
})
