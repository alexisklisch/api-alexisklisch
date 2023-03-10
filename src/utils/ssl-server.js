const https = require('https')
const fs = require('fs')
const path = require('path')

const sslServer = app => {
  const options = {
    key: fs.readFileSync(path.join(__dirname, '/../../ssl/key.pem'), 'utf-8'),
    cert: fs.readFileSync(path.join(__dirname, '/../../ssl/cert.pem'), 'utf-8')
  }

  return https.createServer(options, app)
    .listen(3001, () => console.log('Iniciado en el puerto 3001 - HTTPS'))
}

module.exports = sslServer
