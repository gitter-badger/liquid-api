// POST /confirm-phone
//
// Lookup a phone registration code
//
// Expects:
//
// {
//   phone: String, 10 digit number
//   registrationSecret: String, 3 digit number
// }
//
//
// Responses:
//
// {
//   status: 202,
//   body: {
//     text: 'Confirmed.',
//     registrationId: voter_id,
//   }
// }
//
// {
//   status: 401,
//   message: "Invalid registration code."
// }
//
// {
//   status: 400,
//   message: "Missing required field."
// }
//
//

const r = require('rethinkdb')

module.exports = (req, res) => {

  const { phone, registrationSecret } = req.body

  if (!phone || !registrationSecret) {
    res.status(400).send('Missing required field.')
  }

  // Lookup the phone number
  r.table('users').filter({ phone }).run(req.app.locals.dbConn).call('toArray')
  .then(([voter]) => {

    // Is the phone number known and the registration secrets match?
    if (!voter || voter.registrationSecret !== Number(registrationSecret)) {
      res.status(401).send('Invalid registration code.')
      return
    }

    // Update the voter's phone_confirmed_at field
    r.table('users')
    .get(voter.id)
    .update({ phone_confirmed_at: new Date() })
    .run(req.app.locals.dbConn)
    // Send success reply
    .then(() => res.send(res.status(202).send({ text: 'Confirmed.', registrationId: voter.id })))
  })
}
