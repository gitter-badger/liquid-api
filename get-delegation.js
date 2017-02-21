// GET /delegates/:voter_id — Get a user's delegatation list
//
//
// Response:
//
// body
// [{
//   email: String,
//   name: String,
//   phone: String,
// }]
//

//
// TODO: Authenticate this route
//

const r = require('rethinkdb')

module.exports = (req, res) => (

  // Get the delegation for this voter
  r.table('users').get(req.params.voter_id).run(req.app.locals.dbConn)

  .then((voter) => {
    res.status(200).json(voter.delegates || [])
  })

)
