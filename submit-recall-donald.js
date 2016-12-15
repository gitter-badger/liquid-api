// POST /recalldonald — Store submissions for recalldonald.org
//
// Expects:
//
// body
// {
//   email: 'bob@email.com',
//   'BERNIE SANDERS': true,
//   'EVAN MCMULLIN': true,
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
  const newDoc = {
    email: req.body.email,
    zip: req.body.zip,
    date: new Date(),
  }

  // Convert boolean votes into 0 and 1 for easier sums
  ;[
    'HILLARY CLINTON', 'TED CRUZ', 'BERNIE SANDERS', 'MIKE PENCE', 'JOHN KASICH', 'MITT ROMNEY', 'PAUL RYAN', 'JOE BIDEN', 'GARY JOHNSON', 'EVAN MCMULLIN', 'JILL STEIN', 'ELIZABETH WARREN',
  ].forEach((name) => {
    newDoc[name] = Number(req.body[name])
  })

  r.table('recallDonald').insert(newDoc).run(req.app.locals.dbConn)
  .then(() => {
    res.status(201).send('Submission recorded.')
  })
}
