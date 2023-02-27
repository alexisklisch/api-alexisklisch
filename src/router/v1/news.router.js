const { Router } = require('express')
const passport = require('passport')
const { createNewSchema } = require('../../db/schemas/news.schema.js')
const { checkRoles } = require('../../middlewares/auth.handler.js')
const validatorHandler = require('../../middlewares/validator.handler.js')
const { NewsService } = require('../../services/News.service.js')
const newsService = new NewsService()
const router = Router()

// Create new
router.post('/',
  passport.authenticate('jwt', { session: false }),
  /* checkRoles(['admin']), */
  validatorHandler(createNewSchema, 'body'),
  async (req, res, next) => {
    try {
      const rta = await newsService.createNew(req.body)
      res.json(rta)
    } catch (err) {
      next(err)
    }
  })

// Read new
router.get('/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const rta = await newsService.getNews()
      res.json(rta)
    } catch (err) {
      next(err)
    }
  })

// Read new by PK
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const rta = await newsService.getNewById(id)
    res.json(rta)
  } catch (err) {
    next(err)
  }
})

// Update new
router.patch('/:id',
  validatorHandler(createNewSchema, 'params'),
  async (req, res, next) => {
    try {
      const { body } = req
      const { id } = req.params
      const rta = await newsService.updateNew(id, body)
      res.json(rta)
    } catch (err) {
      next(err)
    }
  })

// Delete new
router.delete('/:id',
  validatorHandler(createNewSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const rta = await newsService.deleteNew(id)
      res.json(rta)
    } catch (err) {
      next(err)
    }
  })

module.exports = router
