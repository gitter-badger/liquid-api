// POST /login-by-phone
//
// Hit this endpoint to begin authentication.
//
// Expects:
//
// {
//   phone: String, 10 digit number
// }
//
// Response:
//
// {
//   status: 201,
//   message: "A text message has been sent with further instructions."
// }
//
// When they hit this endpoint, a new row will be created in the sessions collection.
//
// Users can use this to authenticate whether they've already signed up or not.
// In either case, they'll receive an sms with a hashed link to activate their session.
//
// It makes for a very simple form so they can begin the signup process as quickly as possible. We can collect their other signup info next.
//

const cryptoRandomString = require('crypto-random-string')
const r = require('rethinkdb')
const sendLoginSMS = require('./send-login-sms')
const sendRegistrationSMS = require('./send-registration-sms')

module.exports = (req, res) => {
  const { phone } = req.body

  if (!phone) {
    res.status(400).send('No phone provided.')
    return
  }

  // Is it a valid 10 digit phone number?
  if (!/^\d{10}$/.test(phone)) {
    res.status(400).send('Invalid 10 digit phone number')
    return
  }

  // Is this a new phone number?
  r.table('voters').filter({ phone }).run(req.app.locals.dbConn).call('toArray')
  .then(([voter]) => {
    if (!voter) {

      const registrationSecret = cryptoRandomString(6)

      // Insert the new phone number into voters table
      r.table('voters').insert({
        first_seen: r.now(),
        phone,
        registrationSecret,
      }).run(req.app.locals.dbConn)

      // Send registration sms
      .then(() => sendRegistrationSMS(phone, registrationSecret))

      res.status(201).send('A text message has been sent to register your phone.')
    } else {
      // Is this a number that's been typed in before, but isn't verified?
      // TODO: Better handling for this case
      if (!voter.registration_verified_at) {
        return res.status(401).send('This number\'s voter registration is incomplete.')
      }

      // Verified phone number, log them in.

      // Create new session
      r.table('sessions').insert({
        phone,
        date_created: r.now(),
        voter_id: voter.id,
      }).run(req.app.locals.dbConn)

      // Send login sms
      .then(result => sendLoginSMS(phone, result.generated_keys[0]))

      res.status(202).send('A text message has been sent with further instructions.')
    }
  })
}
