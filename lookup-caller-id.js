// Running this lookup costs $0.01 each call

require('dotenv').config({ silent: true })
const LookupsClient = require('twilio').LookupsClient

const client = new LookupsClient(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

const phoneNumber = '5558675309'

client.phoneNumbers(phoneNumber).get({
  type: 'caller-name',
}, (error, results) => {
  if (error) {
    console.log(error)
  }

  console.log(results)
})
