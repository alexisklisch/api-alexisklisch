const { Router } = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const { serialize } = require('cookie')
const { env, superSecret } = require('../../../config.js')
const router = Router()

// Login
router.post('/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const { user } = req
      const payload = {
        // After math function... Secs, Mins, Hours, Days
        exp: Math.floor(Date.now() / 1000) + 60 * 5, // 5 minutes
        sub: user.id,
        role: user.role
      }
      const token = jwt.sign(payload, superSecret)

      const serialized = serialize('loginToken', token, {
        httpOnly: true,
        secure: env === 'production',
        sameSite: 'none',
        maxAge: 1000 * 60 * 5,
        path: '/'
      })

      res.setHeader('Set-Cookie', serialized)
      res.json('Login Succesfully')
    } catch (err) {
      next(err)
    }
  })

module.exports = router
