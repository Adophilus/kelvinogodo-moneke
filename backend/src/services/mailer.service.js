const config = require('../config')

module.exports = {
  async send({ to, template, params = {} }) {
    const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      headers: { 'Content-Type': 'application/json'},
      method: 'POST',
      body: JSON.stringify({
        service_id: config.mail.serviceId,
        template_id: template,
        user_id: config.mail.publicKey,
        template_params: { ...params, to },
        accessToken: config.mail.privateKey
      })
    })
    console.log(await res.text())
  }
}
