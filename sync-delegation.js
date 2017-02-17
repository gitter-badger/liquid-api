// POST /delegates — Sync updated delegatation list
//
// Expects:
//
// body
// {
//   delegates: [{
//     email: String,
//     name: String,
//     phone: String,
//   }],
//   voter_id: String,
// }
//
// Response:
//
// {
//   status: 201,
//   message: "Delegation saved."
// }
//

//
// TODO: Authenticate this route
//

const r = require('rethinkdb')

module.exports = (req, res) => {
  const { delegates, voter_id } = req.body

  // Save the delegation for this voter
  return r.table('voters').get(voter_id).update({
    delegates,
  }).run(req.app.locals.dbConn)

  // Send back success
  .then(() => {
    res.status(201).send('Delegation saved.')
  })
}
