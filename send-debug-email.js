const mailgun = new (require('mailgun-js'))({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN })

module.exports = (subject, body) => mailgun.messages().send({
  from: `LV Debug <debug@${process.env.MAILGUN_DOMAIN}>`,
  to: 'debug@liquid.vote',
  subject, // eslint-disable-line sort-keys
  text: body,
})
