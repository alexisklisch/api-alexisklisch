const Joi = require('joi')

const integer = Joi.number().integer()
const string = length => Joi.string().max(length)

const createNewSchema = Joi.object({
  title: string(64).required(),
  body: string(128),
  link: string(64).uri(),
  usersId: integer.required()
})

const getNewByPKSchema = Joi.object({
  id: integer.required()
})

const updateNewSchema = Joi.object({
  username: string(64),
  body: string(128),
  link: string(64).hostname(),
  usersId: integer.required()
})

module.exports = { createNewSchema, getNewByPKSchema, updateNewSchema }
