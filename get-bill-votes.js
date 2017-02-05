// GET /votes/bill/:bill_id
//
// Hit this endpoint to get direct vote counts on a bill
//
// Response:
//
//  {
//    yea: 7,
//    nay: 4,
//    abstain: 1
//  }
//

const r = require('rethinkdb')

module.exports = (req, res) => {
  r.table('votes')

  .filter({ bill_id: req.params.bill_id })

  // Count the positions at the db level
  .group('position').count()
  .run(req.app.locals.dbConn)

  // Simplify db response syntax
  .reduce((memo, position) => (Object.assign(memo, {
    [position.group]: position.reduction,
  })), { yea: 0, nay: 0, abstain: 0 })

  .then(results => res.status(200).send(results))
}
