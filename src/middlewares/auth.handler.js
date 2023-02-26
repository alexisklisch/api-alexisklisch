const boom = require('@hapi/boom')

const checkRoles = roles => {
  return (req, res, next) => {
    const { user } = req

    if (roles.includes(user.role)) {
      next()
    } else {
      next(boom.forbidden('No tiene los permisos para acceder'))
    }
  }
}

module.exports = { checkRoles }
