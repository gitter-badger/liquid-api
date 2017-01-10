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

const r = require('rethinkdb')
const sendLoginSMS = require('./send-login-sms')

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
  .tap((voters) => {
    if (voters.length === 0) {

      // Insert the new phone number into voters table
      return r.table('voters').insert({
        phone,
        date_joined: r.now(),
      }).run(req.app.locals.dbConn)
    }
  })
  .then(([voter]) => {

    if (voter) {

      // Create new session
      r.table('sessions').insert({
        phone,
        date_created: r.now(),
        voter_id: voter.id,
      }).run(req.app.locals.dbConn)

      // Send login sms
      .then(result => sendLoginSMS(phone, result.generated_keys[0]))
    }

    res.status(201).send('A text message has been sent with further instructions.')
  })
}
