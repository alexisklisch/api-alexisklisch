const { models } = require('../libs/sequelize.js')

class UsersService {
  // Create user
  async createUser (user) {
    return await models.Users.create(user)
  }

  // Get all users
  async getUsers () {
    return await models.Users.findAll()
  }

  // Get user by PK
  async getUserByPk (id) {
    return await models.Users.findByPk(id)
  }

  // Update user
  async updateUser (id, data) {
    const currentUser = await this.getUserByPk(id)
    currentUser.update(data)
  }

  // Delete user
  async deleteUser (id) {
    const currentUser = await this.getUserByPk(id)
    currentUser.destroy()
    return { message: 'Usuario eliminado satisfactoriamente' }
  }
}

module.exports = { UsersService }
