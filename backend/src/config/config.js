module.exports = {
  mail: {
    privateKey: process.env.EMAILJS_PRIVATE_KEY,
    publicKey: process.env.EMAILJS_PUBLIC_KEY,
    serviceId: process.env.EMAILJS_SERVICE_ID,
    templates: {
      VERIFY_EMAIL: 'template_kci4zak'
    }
  }
}
