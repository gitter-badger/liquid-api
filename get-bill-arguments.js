// GET /bill/:bill_uid/arguments
//
// Show top vote arguments for & against a bill
//
// Response:
//
// {
//   yea: [
//     'Text of argument 1',
//     'Text of argument 2',
//     'Text of argument 3',
//   ],
//   nay: [
//     'Text of argument 1',
//     'Text of argument 2',
//     'Text of argument 3',
//   ]
// }
//

const r = require('rethinkdb')

module.exports = (req, res) => {
  r.table('votes')

  .filter({ bill_uid: req.params.bill_uid })

  // Get all arguments, grouped into positions.
  .group('position').getField('argument')
  .run(req.app.locals.dbConn)

  // Simplify db response syntax
  .reduce((memo, position) => (Object.assign(memo, {
    [position.group]: position.reduction,
  })), { yea: [], nay: [], abstain: [] }) // eslint-disable-line sort-keys

  .then(results => res.status(200).send(results))
}
