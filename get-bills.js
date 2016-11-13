// GET /bills
//
// Hit this endpoint to get the legislative bills
//
// Response:
//
//   [
//    {}
//   ]
//

const r = require('rethinkdb')

module.exports = (req, res) => {
  r.table('bills').run(req.app.locals.dbConn).call('toArray')
  .then(results => (
    res.status(200).send(results)
  ))
}
