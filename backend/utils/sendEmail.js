const nodemailer = require('nodemailer')

    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: Number(process.env.EMAIL_PORT),
      secure: Boolean(process.env.SECURE),
      auth: {
        user: process.env.USER,
        pass: process.env.PASS
      }
    })

module.exports = async (email, subject, text) => {
  try {
    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      text: text
    })
    console.log('email sent successfully')
  } catch (error) {
    console.log('[ERROR] Mail not sent')
    console.log(error)
  }
}
