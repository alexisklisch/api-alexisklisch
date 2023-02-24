const { models } = require('../libs/sequelize.js')

class UsersService {
  // Get all users
  async getUsers () {
    return await models.Users.findAll()
  }

  // Create user
  async createUser (user) {
    return await models.Users.create(user)
  }
}

module.exports = { UsersService }
