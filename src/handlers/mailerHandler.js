const nodemailer = require('nodemailer')

const sendMail = async () => {
  const transporter = nodemailer.createTransport({
    host: 'c1421653.ferozo.com',
    port: 465,
    secure: true,
    auth: {
      user: 'no-reply@alexisklisch.com',
      pass: 's/R570a5iD'
    }
  })

  const info = await transporter.sendMail({
    from: 'no-reply@alexisklisch.com',
    to: 'unbosquense@gmail.com',
    subject: 'Enviado desde Node 1 | Jijiji',
    text: 'Voy a probar ver qué texto se ve. ¿El texto plano?',
    html: '<b>¿O HTML enriquecido de cosas bellas?</b>'
  })

  console.log('Mensaje enviado: ', info.messageId)
}

sendMail()

module.exports = sendMail
