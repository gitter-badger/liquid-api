// GET /endorsements-and-pledges
//
// Hit this endpoint to get the endorsements and total pledged.
// Based on submissions from https://contribute.liquid.vote
//
// Response:
//
//   Status code: 200
//   {
//     total_pledged: Number,
//     backers: Number,
//     endorsements: [{
//       displayName: String,
//       endorsement: String,
//       created: String,
//     }],
//   }
//

const r = require('rethinkdb')
const _ = require('lodash')

module.exports = (req, res) => {
  r.table('endorsements').filter({ approved: true }).run(req.app.locals.dbConn).call('toArray')
  .then(approvedPledges => (
    res.status(200).send({
      backers: approvedPledges.filter(doc => typeof doc.pledge === 'number' && doc.pledge > 0).length,
      endorsements: approvedPledges.map(doc => _.pick(doc, ['displayName', 'endorsement', 'created'])),
      total_pledged: _.sumBy(approvedPledges, 'pledge'),
    })
  ))
}
