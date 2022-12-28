const config = require('../config/config')

module.exports = {
  send({ receiver, template, params }) {
    return fetch('https://api.emailjs.com/api/v1.0/email/send', {
      type: 'POST',
      body: JSON.stringify({
        service_id: config.mail.serviceId,
        template_id: template,
        user_id: config.mail.publicKey,
        template_params: params,
        accessToken: config.mail.privateKey
      })
    })
  }
}
