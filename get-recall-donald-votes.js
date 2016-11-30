// GET /recalldonald/votes — Get votes from recalldonald.org
//
// Response:
//
// {
//   status: 201,
//   body: {
//   'BERNIE SANDERS': 17,
//   'ED MCMULLEN': 11,
//   'ELIZABETH WARREN': 25,
//   'GARY JOHNSON': 13,
//   'HILLARY CLINTON': 22,
//   'JILL STEIN': 11,
//   'JOE BIDEN': 23,
//   'JOHN KASICH': 30,
//   'MIKE PENCE': 5,
//   'MITT ROMNEY': 29,
//   'PAUL RYAN': 26,
//   'TED CRUZ': 7,
//   }
// }
//
//

const r = require('rethinkdb')

module.exports = (req, res) => {
  r.db('lv').table('recallDonald').reduce((left, right) => ({
    'HILLARY CLINTON': left('HILLARY CLINTON').add(right('HILLARY CLINTON')),
    'TED CRUZ': left('TED CRUZ').add(right('TED CRUZ')),
    'BERNIE SANDERS': left('BERNIE SANDERS').add(right('BERNIE SANDERS')),
    'MIKE PENCE': left('MIKE PENCE').add(right('MIKE PENCE')),
    'JOHN KASICH': left('JOHN KASICH').add(right('JOHN KASICH')),
    'MITT ROMNEY': left('MITT ROMNEY').add(right('MITT ROMNEY')),
    'PAUL RYAN': left('PAUL RYAN').add(right('PAUL RYAN')),
    'JOE BIDEN': left('JOE BIDEN').add(right('JOE BIDEN')),
    'GARY JOHNSON': left('GARY JOHNSON').add(right('GARY JOHNSON')),
    'EVAN MCMULLIN': left('ED MCMULLEN').add(right('ED MCMULLEN')),
    'JILL STEIN': left('JILL STEIN').add(right('JILL STEIN')),
    'ELIZABETH WARREN': left('ELIZABETH WARREN').add(right('ELIZABETH WARREN')),
  })).run(req.app.locals.dbConn)
  .then(result => res.status(200).send(result))
}
