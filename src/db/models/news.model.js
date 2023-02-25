const { DataTypes, Model } = require('sequelize')
const { USERS_TABLE } = require('./users.model')

const NEWS_TABLE = 'news'

const newsSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  body: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
    field: 'created_at'
  },
  link: {
    type: DataTypes.STRING
  },
  usersId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: USERS_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
}

class News extends Model {
  static associate (models) {
    this.belongsTo(models.Users, { as: 'users' })
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: NEWS_TABLE,
      modelName: 'News',
      timestamps: false
    }
  }
}

module.exports = { NEWS_TABLE, newsSchema, News }
