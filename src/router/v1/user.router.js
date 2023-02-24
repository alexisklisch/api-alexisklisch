const { Router } = require('express')
const { UsersService } = require('../../services/Users.service.js')
const usersService = new UsersService()
const router = Router()

router.get('/', async (req, res) => {
  const rta = await usersService.getUsers()
  res.json(rta)
})

// Create user
router.post('/', async (req, res) => {
  const rta = await usersService.createUser(req.body)
  res.json(rta)
})

module.exports = router
