// POST /accept-invite
//
// Hit this endpoint to begin authentication.
//
// Expects:
//
// {
//   email: String, email regex
//   name: String,
//   ref: String,
//   zip: String,
// }
//
// Response:
//
// {
//   status: 201,
//   message: "An email has been sent with further instructions."
// }
//
//

const isEmail = require('isemail')
const r = require('rethinkdb')
const sendDebugEmail = require('./send-debug-email')
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

  const acceptedFields = [
    'name',
    'ref',
    'zip',
  ]

  // Update voter with their new info
  const changes = acceptedFields.reduce((memo, field) => {
    if (req.body[field]) {
      memo[field] = req.body[field]
    }
    return memo
  }, {})

  // Is this a new email?
  r.table('voters').filter({ email }).run(req.app.locals.dbConn).call('toArray')
  .then(([voter]) => {
    if (voter) {
      // Duplicate email
      res.status(201).send('Thank you.')

      sendDebugEmail(
        '/accept-invite dupe email',
        JSON.stringify(req.body)
      )

      return
    }

    // Insert the new email address into voters table
    r.table('voters').insert(Object.assign({
      email,
      first_seen: new Date(),
    }, changes)).run(req.app.locals.dbConn)

    // Send welcome email
    .then(() => sendWelcomeEmail(email))

    return res.status(201).send('Thank you.')
  })
}
