const passport = require('passport')
const jwtStrategy = require('./strategies/jwt.strategy.js')
const localStrategy = require('./strategies/local.strategy.js')

passport.use(localStrategy)
passport.use(jwtStrategy)
