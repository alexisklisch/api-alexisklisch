const { Router } = require('express')
const { UsersService } = require('../../services/Users.service.js')
const usersService = new UsersService()
const router = Router()

// Create user
router.post('/', async (req, res, next) => {
  try {
    const { body } = req
    const rta = await usersService.createUser(body)
    console.log(rta)
    res.json(rta)
  } catch (err) {
    next()
  }
})

router.get('/', async (req, res) => {
  const rta = await usersService.getUsers()
  res.json(rta)
})

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const rta = await usersService.getUserByPk(id)
    res.json(rta)
  } catch (err) {
    res.json({ err: 'El usuario no existe' })
  }
})

router.patch('/:id', async (req, res) => {
  const { id } = req.params
  const { body } = req
  const rta = await usersService.updateUser(id, body)
  res.json(rta)
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  const rta = await usersService.deleteUser(id)
  res.json(rta)
})

module.exports = router
