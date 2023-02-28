const boom = require('@hapi/boom')
const { models } = require('../libs/sequelize.js')

class NewsService {
  // Create user
  async createNew (data) {
    return await models.News.create(data)
  }

  // Get all news
  async getNews () {
    return await models.News.findAll()
  }

  // Get new by PK
  async getNewById (id) {
    return await models.News.findByPk(id, { include: ['users'] })
  }

  // Update new
  async updateNew (id, data, idFromToken) {
    const currentNew = await models.News.findByPk(id)
    console.log(currentNew.dataValues.id, idFromToken)
    if (currentNew.dataValues.usersId !== idFromToken) throw boom.unauthorized('No tienes acceso a esa cuenta')
    const rta = await currentNew.update(data, { include: ['users'] })
    return rta
  }

  // Delete new
  async deleteNew (id) {
    const currentNew = await this.getNewById(id)
    currentNew.destroy()
    return { message: 'New deleted' }
  }
}

module.exports = { NewsService }
