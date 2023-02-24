const { Users, usersSchema } = require('./users.model')
const { News, newsSchema } = require('./news.model')

const setupModels = sequelize => {
  Users.init(usersSchema, Users.config(sequelize))
  News.init(newsSchema, News.config(sequelize))
}

module.exports = { setupModels }
