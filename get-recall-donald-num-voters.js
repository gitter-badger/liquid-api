// GET /recalldonald/numvoters — Get number of participants in recalldonald.org
//
// Response:
//
// {
//   status: 201,
//   body: {
//    total: 3,
//   }
// }
//
//

const r = require('rethinkdb')

module.exports = (req, res) => {
  r.db('lv').table('recallDonald').count().run(req.app.locals.dbConn)
  .then(result => res.status(200).send({ total: result }))
}
