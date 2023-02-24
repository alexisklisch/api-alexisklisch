const { Router } = require('express')
const userRoute = require('./v1/user.router.js')

const routerApi = app => {
  const routerV1 = Router()

  app.use('/v1', routerV1)
  routerV1.use('/users', userRoute)
}

module.exports = { routerApi }
