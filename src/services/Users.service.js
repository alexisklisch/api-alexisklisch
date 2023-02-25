const boom = require('@hapi/boom')
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
    const user = await models.Users.findByPk(id)
    if (user === null) throw boom.notFound('El usuario no existe')
    return user
  }

  // Update user
  async updateUser (id, data) {
    const currentUser = await models.Users.findByPk(id)
    if (currentUser === null) throw boom.notFound('El usuario no existe')
    return await currentUser.update(data)
  }

  // Delete user
  async deleteUser (id) {
    const currentUser = await this.getUserByPk(id)
    currentUser.destroy()
    return { message: 'Usuario eliminado satisfactoriamente' }
  }
}

module.exports = { UsersService }