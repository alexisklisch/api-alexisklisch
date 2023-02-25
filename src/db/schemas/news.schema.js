const Joi = require('joi')

const integer = Joi.number().integer()
const string = length => Joi.string().max(length)

const createNewSchema = Joi.object({
  id: integer.required(),
  username: string(64).required(),
  body: string(128),
  createdAt: Joi.date().required(),
  link: string(64).hostname().default('https://google.com'),
  usersId: integer.required()
})

const getNewByPKSchema = Joi.object({
  id: integer.required()
})

const updateNewSchema = Joi.object({
  username: string(64),
  body: string(128),
  link: string(64).hostname().default('https://google.com'),
  usersId: integer.required()
})

module.exports = { createNewSchema, getNewByPKSchema, updateNewSchema }
