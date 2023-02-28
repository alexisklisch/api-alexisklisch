const { Router } = require('express')
const usersRoute = require('./v1/users.router.js')
const newsRoute = require('./v1/news.router.js')
const authRoute = require('./v1/auth.router.js')

const routerApi = app => {
  const routerV1 = Router()

  app.use('/v1', routerV1)

  routerV1.use('/users', usersRoute)
  routerV1.use('/news', newsRoute)
  routerV1.use('/auth', authRoute)
}

module.exports = { routerApi }
