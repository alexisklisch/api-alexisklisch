const { DataTypes, Model } = require('sequelize')

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
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
    field: 'created_at'
  },
  link: {
    type: DataTypes.STRING
  }
}

class News extends Model {
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
