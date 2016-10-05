// PUT /voters — An API endpoint to update voter registration info.
//
// Expects:
//
// body
// {
//   full_name: String <1 – 100 characters>,
//   zip: String, 00000 < x < 99999,
// }

const r = require('rethinkdb')

module.exports = (req, res) => {
  const { full_name, zip } = req.body

  // Update voter with their new info
  const changes = {}
  if (full_name) changes.full_name = full_name // eslint-disable-line camelcase
  if (zip) changes.zip = zip

  return r.table('voters').get(req.params.voter_id).update(changes).run(req.app.locals.dbConn)
  .then(() => {
    res.send('Updated')
  })
}
