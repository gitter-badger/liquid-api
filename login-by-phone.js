// POST /login-by-phone
//
// Hit this endpoint to begin authentication by phone number.
//
// Users can use this to authenticate whether they've already signed up or not.
// In either case, they'll receive an sms with a hashed link to activate their session.
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

const r = require('rethinkdb')
const sendLoginSMS = require('./send-login-sms')
const sendRegistrationSMS = require('./send-registration-sms')
const randomWord = require('random-word')
const randomstring = require('randomstring')

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
  r.table('users').filter({ phone }).run(req.app.locals.dbConn).call('toArray')
  .then(([voter]) => {
    if (!voter) {

      // Generate a random number from [100, 999]
      const registrationSecret = Math.floor(Math.random() * (899)) + 100

      // Insert the new phone number into voters table
      r.table('users').insert({
        first_seen: r.now(),
        inviteCode: randomstring(8),
        phone,
        registrationSecret,
        secret: `${randomWord()}-${randomWord()}-${randomWord()}`,
      }).run(req.app.locals.dbConn)

      // Send registration sms
      .then(() => sendRegistrationSMS(phone, registrationSecret))

      res.status(201).send('A text message has been sent to register your phone.')

    } else {

      // Is this a number that's been typed in before, but isn't verified?
      if (!voter.registration_verified_at) {

        if (voter.registrationSecret) {
          sendRegistrationSMS(phone, voter.registrationSecret)
        }

        return res.status(401).send('This number\'s voter registration is incomplete.')
      }

      // // Verified phone number, log them in!

      // Create new session
      r.table('sessions').insert({
        date_created: r.now(),
        phone,
        voter_id: voter.id,
      }).run(req.app.locals.dbConn)

      // Send login sms
      .then(result => sendLoginSMS(phone, result.generated_keys[0]))

      res.status(202).send('A text message has been sent with further instructions.')
    }
  })
}
