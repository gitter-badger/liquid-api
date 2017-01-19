// PUT /voters — An API endpoint to update voter registration info.
//
// Expects:
//
// body
// {
//   full_name: String
//   secret: String
// }

const r = require('rethinkdb')

module.exports = (req, res) => {
  const { full_name, secret } = req.body

  // Update voter with their new info
  const changes = {}
  if (full_name) changes.full_name = full_name // eslint-disable-line camelcase
  if (secret) changes.secret = secret

  return r.table('voters').get(req.params.voter_id).update(changes).run(req.app.locals.dbConn)
  .then(() => {
    res.send('Updated')
  })
}
