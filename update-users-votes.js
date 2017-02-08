// POST /votes/:voter_id — Vote directly on a bill
//
// Expects:
//
// body
// {
// bill_uid: bill_uid,
// position: ['yea', 'nay', 'abstain'],
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
//   message: "Invalid position: req.body.bill_uid"
// }
//
// TODO: Authenticate this route
//

const r = require('rethinkdb')

module.exports = (req, res) => {
  const { bill_uid, position } = req.body

  if (!bill_uid) {
    return res.status(400).send(`Invalid bill_uid: ${bill_uid}`)
  }

  if (!['yea', 'nay', 'abstain'].includes(position)) {
    return res.status(400).send(`Invalid position: ${position}`)
  }

  // Did the user already vote on this bill?
  r.table('votes').filter({ bill_uid, voter_id: req.params.voter_id })
  .run(req.app.locals.dbConn).call('toArray')
  .then(([oldVote]) => {
    // If there's already a vote, update it
    if (oldVote) {
      const newVote = Object.assign({}, oldVote)

      // Store the previous position
      if (oldVote.previousPositions === undefined) { newVote.previousPositions = [] }
      newVote.previousPositions.push({ date: oldVote.date, position: oldVote.position })

      newVote.date = r.now()
      newVote.position = position

      return r.table('votes').replace(newVote).run(req.app.locals.dbConn)
    }

    // Otherwise insert a new vote
    return r.table('votes').insert({
      bill_uid,
      date: r.now(),
      position,
      voter_id: req.params.voter_id,
    }).run(req.app.locals.dbConn)
  })
  .then(() => {
    res.status(201).send('Vote recorded.')
  })
}
