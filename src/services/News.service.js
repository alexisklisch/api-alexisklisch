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
  async updateNew (id, data) {
    console.log(data)
    const currentNew = await models.News.findByPk(id)
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
