const mailgun = new (require('mailgun-js'))({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN })

module.exports = (email, sessionId) => mailgun.messages().send({
  from: `Liquid Vote <info@${process.env.MAILGUN_DOMAIN}>`,
  to: email,
  subject: 'Sign in to Liquid Democracy', // eslint-disable-line sort-keys
  html: `Click this magic link to sign in: https://app.liquid.vote/?secret=${sessionId}`, // eslint-disable-line sort-keys
})
