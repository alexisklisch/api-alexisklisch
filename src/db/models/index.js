const { Users, usersSchema } = require('./users.model')

const setupModels = sequelize => {
  Users.init(usersSchema, Users.config(sequelize))
}

module.exports = { setupModels }
