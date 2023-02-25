const { Router } = require('express')
const { NewsService } = require('../../services/News.service.js')
const newsService = new NewsService()
const router = Router()

// Create new
router.post('/', async (req, res) => {
  const rta = await newsService.createNew(req.body)
  res.json(rta)
})

// Read new
router.get('/', async (req, res) => {
  const rta = await newsService.getNews()
  res.json(rta)
})

// Read new by PK
router.get('/:id', async (req, res) => {
  const { id } = req.params
  const rta = await newsService.getNewById(id)
  res.json(rta)
})

// Update new
router.patch('/:id', async (req, res) => {
  const { body } = req
  const { id } = req.params
  const rta = await newsService.updateNew(id, body)
  res.json(rta)
})

// Delete new
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  const rta = await newsService.deleteNew(id)
  res.json(rta)
})

module.exports = router
