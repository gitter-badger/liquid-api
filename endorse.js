// POST /endorse
//
// Hit this endpoint to add your endorsement or pledge.
//
// Expects:
//
// {
//   endorsement: String,
//   displayName: String,
//   zip: String,
//   email: String, email regex,
//   pledge: String
// }
//
//
// Response:
//
// {
//   status: 201,
//   message: "Thank you."
// }
//

const isEmail = require('isemail')
const r = require('rethinkdb')
const sendWelcomeEmail = require('./send-welcome-email')
const mailgun = new (require('mailgun-js'))({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN })

module.exports = (req, res) => {

  let email
  const { endorsement, displayName, zip, pledge } = req.body

  // Is it a valid email?
  if (req.body.email && isEmail.validate(req.body.email)) {

    // Treat email addresses as case insensitive
    email = req.body.email.toLowerCase()

    res.status(201).send('Thank you.')

    // Is this a new email?
    r.table('users').filter({ email }).run(req.app.locals.dbConn).call('toArray')
    .tap(([existingVoter]) => {
      if (!existingVoter) {

        // Insert the new email address into users table
        return r.table('users').insert({
          email,
          first_seen: r.now(),
          full_name: displayName,
          zip,
        }).run(req.app.locals.dbConn)

        // Send welcome email
        .then(() => sendWelcomeEmail(email))
      }
    })
  }

  const firstName = req.body.displayName && req.body.displayName.split(' ')[0]

  // Send confirmation email:
  mailgun.messages().send({
    from: `Liquid Vote <info@${process.env.MAILGUN_DOMAIN}>`,
    to: email || 'missing-email@liquid.vote',
    bcc: 'info@liquid.vote', // eslint-disable-line sort-keys
    subject: 'Thanks for supporting Liquid Democracy',
    // eslint-disable-next-line sort-keys
    html: `Hi ${firstName || ''},

    Here's confirmation of your endorsement and/or pledge for Liquid Democracy, via <a href="https://contribute.liquid.vote">https://contribute.liquid.vote</a>.

    Endorsement: ${endorsement || ''}
    Display Name: ${displayName || ''}
    ZIP: ${zip || ''}

    Pledge: $${pledge || '0'}

    We'll let you know when the campaign launches, and follow-up about payment processing then.

    Thank you!`.replace(/(\n)/g, '<br />'),
  })

  r.table('endorsements').insert({
    approved: false,
    created: r.now(),
    displayName,
    email,
    endorsement,
    pledge,
    zip,
  }).run(req.app.locals.dbConn)

}
