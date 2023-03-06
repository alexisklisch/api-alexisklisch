const boom = require('@hapi/boom')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const { serialize } = require('cookie')
const { models } = require('../libs/sequelize')
const { UsersService } = require('./Users.service')
const { superSecret } = require('../../config.js')

const usersService = new UsersService()

class AuthService {
  async getUser (email, password) {
    const user = await usersService.getUserByEmail(email)
    if (!user) throw (boom.unauthorized())

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) throw (boom.unauthorized())

    delete user.dataValues.password

    return user
  }

  async signToken (user) {
    const payload = {
      // After math function... Secs, Mins, Hours, Days
      exp: Math.floor(Date.now() / 1000) + 60 * 5, // 5 minutes
      sub: user.id,
      role: user.role
    }
    const token = jwt.sign(payload, superSecret)

    const serialized = serialize('loginToken', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 5,
      path: '/'
    })

    return serialized
  }

  async sendEmail (email) {
    const user = await models.Users.findOne({
      where: { email }
    })
    if (!user) throw (boom.unauthorized())

    const transporter = nodemailer.createTransport({
      host: 'c1421653.ferozo.com',
      port: 465,
      secure: true,
      auth: {
        user: 'no-reply@alexisklisch.com',
        pass: 's/R570a5iD'
      }
    })

    await transporter.sendMail({
      from: 'no-reply@alexisklisch.com',
      to: email,
      subject: 'Recuperación de contraseña | Alexis Klisch',
      text: 'Accede al siguiente link para recuperar tu contraseña',
      html: '<b>¿O HTML enriquecido de cosas bellas?</b>'
    })

    return { message: 'E-mail sent' }
  }
}

module.exports = { AuthService }
