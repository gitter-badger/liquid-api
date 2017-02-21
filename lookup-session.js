// GET /session/:id
//
// Lookup an auth session
//
// Response:
//
//   Voter object
//

const r = require('rethinkdb')

module.exports = (req, res) => {

  // Lookup the session
  r.table('sessions').get(req.params.session_id).run(req.app.locals.dbConn)
  .then((session) => {

    // Not found?
    if (!session) return res.status(404).send('Not found')

    // Update the session's last_seen field
    r.table('sessions').get(req.params.session_id)
      .update({ last_seen: new Date() }).run(req.app.locals.dbConn)

    // Lookup the corresponding voter
    .return(r.table('users').get(session.voter_id).run(req.app.locals.dbConn))

    // Send back voter info
    .then(result => res.send(result))
  })
  .catch((error) => {
    console.error(error)
    res.status(400).send('errr')
  })
}
