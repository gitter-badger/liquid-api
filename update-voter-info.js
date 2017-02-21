// PUT /voters/:voter_id — An API endpoint to update voter registration info.
//
// Expects:
//
// {
//   address: String
//   claims_is_registered_voter: Boolean
//   complete: Boolean
//   email: String
//   first_name: String
//   full_name: String
//   last_name: String
//   secret: String
//   zip: String
// }
//
// All fields are optional
//
//
//
// Response:
//
// {
//   status: 200,
//   message: "Updated."
// }
//

const r = require('rethinkdb')
const sendDebugEmail = require('./send-debug-email')

module.exports = (req, res) => {

  const acceptedFields = [
    'address',
    'claims_is_registered_voter',
    'email',
    'first_name',
    'full_name',
    'last_name',
    'secret',
    'zip',
  ]

  // Update voter with their new info
  const changes = acceptedFields.reduce((memo, field) => {
    if (req.body[field]) {
      memo[field] = req.body[field]
    }
    return memo
  }, {})


  return r.table('users').get(req.params.voter_id).update(changes).run(req.app.locals.dbConn)
  .then(() => {
    res.status(200).send('Updated')
  })
  .then(() => {
    // Notify admin if they appeared to finish registration prompts
    if (req.body.complete) {
      r.table('users').get(req.params.voter_id).run(req.app.locals.dbConn)
      .then((voter) => {
        sendDebugEmail(
          'New registration request',
          JSON.stringify(voter)
        )
      })
    }
  })
}
