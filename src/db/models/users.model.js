const { DataTypes, Model } = require('sequelize')

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
      timestamps: false
    }
  }
}

module.exports = { USERS_TABLE, usersSchema, Users }
