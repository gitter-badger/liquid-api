// POST /vote — Vote directly on a bill
//
// Expects:
//
// body
// {
//   bill_uid: String,
//   position: ['yea', 'nay', 'abstain'],
//   secret: String,
//   voter_id: String,
// }
//
// Response:
//
// {
//   status: 201,
//   message: "Vote recorded."
// }
// {
//   status: 400,
//   message: "Invalid bill_uid: req.body.bill_uid"
// }
// {
//   status: 400,
//   message: "Invalid position: position"
// }
//

//
// TODO: Authenticate this route
//

const r = require('rethinkdb')

module.exports = (req, res) => {
  const { bill_uid, position, voter_id, secret } = req.body

  // Did they include a bill?
  if (!bill_uid) {
    return res.status(400).send(`Invalid bill_uid: ${bill_uid}`)
  }

  // Did they include a valid position?
  if (!['yea', 'nay', 'abstain'].includes(position)) {
    return res.status(400).send(`Invalid position: ${position}`)
  }

  // Did the user already vote on this bill?
  r.table('votes').filter({ bill_uid, voter_id }).run(req.app.locals.dbConn)
    .call('toArray')
    .then(([oldVote]) => {

      // If there's already an old vote, update it
      if (oldVote) {
        const newVote = Object.assign({
          date: r.now(),
          position,
          secret,
        }, oldVote)

        // Save the previous position
        newVote.previousPositions.push({ date: oldVote.date, position: oldVote.position })

        return r.table('votes').replace(newVote).run(req.app.locals.dbConn)
      }

      // Otherwise insert a new vote
      return r.table('votes').insert({
        bill_uid,
        date: r.now(),
        position,
        previousPositions: [],
        secret,
        voter_id: req.params.voter_id,
      }).run(req.app.locals.dbConn)

    })

    // Send back success
    .then(() => { res.status(201).send('Vote recorded.') })
}
