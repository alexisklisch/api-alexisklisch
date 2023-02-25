const { Strategy } = require('passport-local')
const boom = require('@hapi/boom')
const bcrypt = require('bcryptjs')

const { UsersService } = require('../../../services/Users.service')
const usersService = new UsersService()

const localStrategy = new Strategy(
  {
    usernameField: 'email'
  },
  async (email, password, done) => {
    try {
      const user = await usersService.getUserByEmail(email)
      if (!user) done(boom.unauthorized())

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) done(boom.unauthorized())

      delete user.dataValues.password
      done(null, user)
    } catch (err) {
      done(err, false)
    }
  })

module.exports = localStrategy
