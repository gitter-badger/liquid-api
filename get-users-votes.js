// GET /votes/:voter_id — Get an individual's direct votes on a bill
//
// Response:
//
// {
//   status: 201,
//   body: {
//    "SF201611-A": "abstain",
//    "SF201611-B": "yea",
//    "SF201611-D": "nay"
//   }
// }
//
// TODO: Authenticate this route
//

const r = require('rethinkdb')

module.exports = (req, res) => {
  // Lookup a voters' positions
  r.table('votes').filter({ voter_id: req.params.voter_id })
    // Only grab the most recent vote for that bill
    .group('bill_id')
    .max('date')
    .run(req.app.locals.dbConn)
  .call('toArray')
  // Only send back the bill_id and position
  .reduce((memo, bill) => {
    memo[bill.group] = bill.reduction.position
    return memo
  }, {})
  .then(votes => res.status(200).send(votes))
}
