const twilio = require('twilio')

const client = new twilio.RestClient(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

module.exports = (phone, sessionId) => client.messages.create({
  body: `Are you ready for Liquid Democracy? Click here to verify your phone: https://app.liquid.vote/?secret=${sessionId}`,
  // TODO: change link to https://app.liquid.vote/confirm/aec4b2a
  to: `+1${phone}`,  // Text this number
  from: `+1${process.env.TWILIO_NUMBER}`,
}, (err) => {
  if (err) {
    return console.error(err)
  }

  // console.log(message.sid)
})
