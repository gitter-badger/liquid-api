// GET /votes/bill/:bill_uid/verification
//
// Generates a list of hashes and positions
//
// Response:
//
//   77a14de056bf7ee73629501fd7942c41e59dc857c404b4f6f426a3c2fdbfbab2 yea
//   609a0a0f6a08067930e5671ff7ac768323b9d4694f4d201622b1db3d5c271df8 yea
//   3856f0a7b52a3b03f3faffa8477115c5aac1bf22632294400c649cb09d9ca532 yea
//   ee1d08fa4a2419d65077b247a089165f4a83b6cac8c3e651fcbe937e81fd954d nay
//   fcd651f744bef16442162c166df2e06d439a472820917d976cd5d3e8acbb5ced yea
//   039d4af6f0cceebce7b9cd0f28243861cdea8ca86118e8e108a5d7a865759e0f nay
//

const hash = require('js-sha3').sha3_256
const _ = require('lodash')
const r = require('rethinkdb')

module.exports = (req, res) => {

  // Get all votes on the bill
  r.table('votes').filter({ bill_uid: req.params.bill_uid }).run(req.app.locals.dbConn)
  .call('toArray')

  // Shuffle the order to avoid leaking additional info
  .then(_.shuffle)

  // Calculate hash
  .reduce((memo, vote) => (
    `${memo + hash(vote.voter_id + vote.bill_uid + vote.position + vote.secret)} ${vote.position}\n`
  ), '')

  .then(results => res.status(200).send(results))
}
