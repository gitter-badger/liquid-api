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
//   message: "Confirmed."
// }
//
// {
//   status: 401,
//   message: "Invalid registration code."
// }
//
//

const r = require('rethinkdb')

module.exports = (req, res) => {

  const { phone, registrationSecret } = req.body

  // Lookup the phone number
  r.table('voters').filter({ phone }).run(req.app.locals.dbConn).call('toArray')
  .then(([voter]) => {

    // Is the phone number known and the registration secrets match?
    if (!voter || voter.registrationSecret !== Number(registrationSecret)) {
      res.status(401).send('Invalid registration code.')
      return
    }

    // Update the voter's phone_confirmed_at field
    r.table('voters')
    .get(voter.id)
    .update({ phone_confirmed_at: new Date() })
    .run(req.app.locals.dbConn)
    // Send success reply
    .then(() => res.send(res.status(202).send('Confirmed.')))
  })
}
