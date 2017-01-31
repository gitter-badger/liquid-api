// PUT /voters/:voter_id — An API endpoint to update voter registration info.
//
// Expects:
//
// {
//   claims_is_registered_voter: Boolean
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
//   message: "Updated."
// }
//

const r = require('rethinkdb')

module.exports = (req, res) => {

  const acceptedFields = [
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


  return r.table('voters').get(req.params.voter_id).update(changes).run(req.app.locals.dbConn)
  .then(() => {
    res.send('Updated')
  })
}
