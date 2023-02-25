const { Router } = require('express')
const { createNewSchema } = require('../../db/schemas/news.schema.js')
const validatorHandler = require('../../middlewares/validator.handler.js')
const { NewsService } = require('../../services/News.service.js')
const newsService = new NewsService()
const router = Router()

// Create new
router.post('/',
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
router.get('/', async (req, res, next) => {
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
