// POST /subscribe
//
// Hit this endpoint to add your email to our mailing list.
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
//   message: "You've subscribed to Liquid Democracy. Welcome."
// }
// {
//   status: 400,
//   message: "Invalid email."
// }
//
// {
//   status: 409,
//   message: "You have already subscribed to Liquid Democracy. Thank you."
// }
//

const isEmail = require('isemail')
const r = require('rethinkdb')
const sendWelcomeEmail = require('./send-welcome-email')

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

  r.table('users').filter({ email }).run(req.app.locals.dbConn).call('toArray')
  .tap(([existingVoter]) => {
    // Is this a duplicate email?
    if (existingVoter) {
      res.status(409).send('You have already subscribed to Liquid Democracy. Thank you.')
      return
    }

    // Insert the new email address into voters table
    return r.table('users').insert({
      email,
      first_seen: r.now(),
    }).run(req.app.locals.dbConn)

    .then(() => res.status(201).send('You\'ve subscribed to Liquid Democracy. Welcome.'))

    // Send welcome email
    .then(() => sendWelcomeEmail(email))
  })
}
