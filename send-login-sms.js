const twilio = require('twilio')

const client = new twilio.RestClient(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

module.exports = (phone, sessionId) => client.messages.create({
  body: `Hi, click this magic link to sign in: https://app.liquid.vote/?secret=${sessionId}`,
  to: `+1${phone}`,  // Text this number
  from: `+1${process.env.TWILIO_NUMBER}`,
}, (err) => {
  if (err) {
    return console.error(err)
  }

  // console.log(message.sid)
})
