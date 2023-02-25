const { Router } = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const { config } = require('../../../config.js')
const router = Router()

// Login
router.post('/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const { user } = req
      const payload = {
        sub: user.id,
        role: user.role
      }
      const token = jwt.sign(payload, config.superSecret)
      res.json({ token })
    } catch (err) {
      next(err)
    }
  })

module.exports = router
