// GET /sf-ballot-measures
//
// Hit this endpoint to get a voters' positions for the November 8, 2016 SF Ballot Measures
//

const r = require('rethinkdb')

module.exports = (req, res) => {
  // Lookup a voters' positions
  r.table('votes').filter({ voter: req.params.voter_id }).run(req.app.locals.dbConn).call('toArray')
  .then((votes) => {
    res.status(200).send(votes)
  })
}
