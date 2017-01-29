// POST /login-by-email
//
// Hit this endpoint to begin authentication.
//
// Expects:
//
// {
//   email: String, email regex
// }
//
// Response:
//
// {
//   status: 201,
//   message: "An email has been sent with further instructions."
// }
//
// When they hit this endpoint, a new row will be created in the sessions collection.
//
// Users can use this to authenticate whether they've already signed up or not.
// In either case, they'll receive an email with a hashed link to activate their session.
// As long as we get their email, we can follow up with them later.
//
// It makes for a very simple form so they can begin the signup process as quickly as possible. We can collect their other signup info next.
//

const isEmail = require('isemail')
const r = require('rethinkdb')
const sendWelcomeEmail = require('./send-welcome-email')
const sendLoginEmail = require('./send-login-email')

module.exports = (req, res) => {
  if (!req.body.email) {
    res.status(400).send('No email provided.')
    return
  }

  // Email addresses are case insensitive
  const email = req.body.email.toLowerCase()

  // Is it a valid email?
  if (!isEmail.validate(email)) {
    res.status(400).send('Invalid email')
    return
  }

  // Is this a new email?
  r.table('voters').filter({ email }).run(req.app.locals.dbConn).call('toArray')
  .tap((voters) => {
    if (voters.length === 0) {

      // Insert the new email address into voters table
      return r.table('voters').insert({
        email,
        first_seen: r.now(),
      }).run(req.app.locals.dbConn)

      // Send welcome email
      .then(() => sendWelcomeEmail(email))
    }
  })
  .then(([voter]) => {

    if (voter) {

      // Create new session
      r.table('sessions').insert({
        email,
        date_created: r.now(),
        voter_id: voter.id,
      }).run(req.app.locals.dbConn)

      // Send login email
      .then(result => sendLoginEmail(email, result.generated_keys[0]))
    }

    res.status(201).send('An email has been sent with further instructions.')
  })
}
