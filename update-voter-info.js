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
  return r.table('voters').get(req.params.voter_id).update({
    full_name,
    zip,
  }).run(req.app.locals.dbConn)
  .then(() => {
    res.send('Updated')
  })
}
