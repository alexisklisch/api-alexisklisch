const { Users, usersSchema } = require('./users.model')
const { News, newsSchema } = require('./news.model')

const setupModels = sequelize => {
  Users.init(usersSchema, Users.config(sequelize))
  News.init(newsSchema, News.config(sequelize))

  Users.associate(sequelize.models)
  News.associate(sequelize.models)
}

module.exports = { setupModels }
