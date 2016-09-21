// POST /login-by-email
//
// Hit this endpoint to begin authentication.
//
// Expects:
//
// {
//   email: String, email regex, <1 - 200 characters>
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

// TODO
//
// - [x] Accept the initial request POST /login-by-email
// - [x] Lookup if they're in DB. Add if not.
// - [ ] Send an email with their hashed link to authenticate
// - [ ] Accept the followup request to authenticate GET /auth?id=[session_uid]

const isEmail = require('isemail')
const r = require('rethinkdb')

module.exports = (req, res) => {
  const { email } = req.body

  // Is it a valid email?
  if (!isEmail.validate(email)) {
    res.status(400).send('Invalid email')
    return
  }

  // Is this a new email?
  r.table('voters').filter({ email }).run(req.app.locals.dbConn).call('toArray')
  .then(results => {
    if (results.length === 0) {

      // Insert the new email into voters table
      return r.table('voters').insert({
        email,
        date_joined: r.now(),
      }).run(req.app.locals.dbConn)

      // TODO: Send welcome email
    }
  })
  .then(() => {
    // TODO: Send login email
    res.status(201).send('An email has been sent with further instructions.')
  })
}
