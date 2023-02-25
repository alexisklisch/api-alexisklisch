const { DataTypes, Model } = require('sequelize')
const bcrypt = require('bcryptjs')

const USERS_TABLE = 'users'

const usersSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  username: {
    type: DataTypes.STRING(16),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'visitor'
  }
}

class Users extends Model {
  static associate (models) {
    this.hasMany(models.News, {
      as: 'news',
      foreignKey: 'usersId'
    })
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: USERS_TABLE,
      modelName: 'Users',
      timestamps: false,
      hooks: {
        beforeCreate: async (user, options) => {
          const cryptPassword = await bcrypt.hash(user.password, 10)
          user.password = cryptPassword
        }
      }
    }
  }
}

module.exports = { USERS_TABLE, usersSchema, Users }
