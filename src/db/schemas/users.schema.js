const Joi = require('joi')

const integer = Joi.number().integer()
const string = length => Joi.string().max(length)

const createUserSchema = Joi.object({
  username: string(16).required(),
  password: string(256).required(),
  email: string(64).email().required(),
  role: string(8).valid('admin', 'visitor')
})

const getUserByPKSchema = Joi.object({
  id: integer.required()
})

const updateUserSchema = Joi.object({
  username: string(16),
  password: string(256),
  email: string(64).email()
})

module.exports = { createUserSchema, getUserByPKSchema, updateUserSchema }
