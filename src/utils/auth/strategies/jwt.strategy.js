const { ExtractJwt, Strategy } = require('passport-jwt')
const config = require('../../../../config.js')

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.superSecret
}

const jwtStrategy = new Strategy(options, (payload, done) => {
  return done(null, payload)
})

module.exports = jwtStrategy
