const { Router } = require('express')
const passport = require('passport')
const { AuthService } = require('../../services/Auth.service.js')

const router = Router()
const authService = new AuthService()

// Login
router.post('/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const { user } = req
      const serialized = await authService.signToken(user)

      res.setHeader('Set-Cookie', serialized)
      res.json('Login Succesfully')
    } catch (err) {
      next(err)
    }
  })

// Email recovery
router.post('/recovery',
  async (req, res, next) => {
    try {
      const { email } = req.body
      const rta = await authService.sendEmail(email)

      res.json(rta)
    } catch (err) {
      next(err)
    }
  })

module.exports = router
