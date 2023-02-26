const { Router } = require('express')
const { createUserSchema, getUserByPKSchema } = require('../../db/schemas/users.schema.js')
const validatorHandler = require('../../middlewares/validator.handler.js')
const { UsersService } = require('../../services/Users.service.js')
const usersService = new UsersService()
const router = Router()

// Create user
router.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { body } = req
      const rta = await usersService.createUser(body)
      res.json(rta)
    } catch (err) {
      next()
    }
  })

router.get('/', async (req, res) => {
  console.log(req.cookies)
  const rta = await usersService.getUsers()
  res.json(rta)
})

router.get('/:id',
  validatorHandler(getUserByPKSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const rta = await usersService.getUserByPk(id)
      res.json(rta)
    } catch (err) {
      next(err)
    }
  })

router.patch('/:id',
  validatorHandler(getUserByPKSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const { body } = req
      const rta = await usersService.updateUser(id, body)
      res.json(rta)
    } catch (err) {
      next(err)
    }
  })

router.delete('/:id',
  validatorHandler(getUserByPKSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const rta = await usersService.deleteUser(id)
      res.json(rta)
    } catch (err) {
      next(err)
    }
  })

module.exports = router
