'use strict'
const { USERS_TABLE } = require('../models/users.model.js')
const { NEWS_TABLE } = require('../models/news.model.js')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const { DataTypes } = Sequelize
    await queryInterface.createTable(USERS_TABLE, {
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
    })

    await queryInterface.createTable(NEWS_TABLE, {
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
        type: DataTypes.STRING,
        defaultValue: 'https://alexisklisch.com'
      },
      userId: {
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
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(USERS_TABLE)
    await queryInterface.dropTable(NEWS_TABLE)
  }
}
