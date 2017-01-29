const twilio = require('twilio')

const client = new twilio.RestClient(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

module.exports = (phone, registrationSecret) => client.messages.create({
  body: `Are you ready for Liquid Democracy? Your code is: ${registrationSecret}. Click here to confirm: https://app.liquid.vote/?confirm=${registrationSecret}`,
  to: `+1${phone}`,
  from: `+1${process.env.TWILIO_NUMBER}`,
}, (err) => {
  if (err) {
    return console.error(err)
  }
})
