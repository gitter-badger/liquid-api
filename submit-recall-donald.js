// POST /recalldonald — Store submissions for recalldonald.org
//
// Expects:
//
// body
// {
//   email: 'bob@email.com',
//   'BERNIE SANDERS': true,
//   'ED MCMULLEN': true,
//   'ELIZABETH WARREN': true,
//   'GARY JOHNSON': true,
//   'HILLARY CLINTON': true,
//   'JILL STEIN': true,
//   'JOE BIDEN': true,
//   'JOHN KASICH': true,
//   'MIKE PENCE': false,
//   'MITT ROMNEY': true,
//   'PAUL RYAN': true,
//   'TED CRUZ': false,
// }
//
// Response:
// {
//   status: 201,
//   message: "Submission recorded."
// }
//

const r = require('rethinkdb')

module.exports = (req, res) => {
  r.table('recallDonald').insert(Object.assign({}, req.body, {
    date: r.now(),
  })).run(req.app.locals.dbConn)
  .then(() => {
    res.status(201).send('Submission recorded.')
  })
}
