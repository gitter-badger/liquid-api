// HEAD /voters
//
// Hit this endpoint to get the number of unique voters
//
// Response:
//
//   X-Total-Count: Integer
//

const r = require('rethinkdb')

module.exports = (req, res) => {
  r.table('voters').count().run(req.app.locals.dbConn)
  .then(result => (
    res.status(201).set({
      'X-Total-Count': result,
    }).send()
  ))
}
