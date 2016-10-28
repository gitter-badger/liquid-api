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

  // Is it a valid email?
  if (req.body.email && isEmail.validate(req.body.email)) {

    // Treat email addresses as case insensitive
    email = req.body.email.toLowerCase()

    res.status(201).send('Thank you.')

    // Is this a new email?
    r.table('voters').filter({ email }).run(req.app.locals.dbConn).call('toArray')
    .tap(([existingVoter]) => {
      if (!existingVoter) {

        // Insert the new email address into voters table
        return r.table('voters').insert({
          email,
          date_joined: r.now(),
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
    bcc: 'info@liquid.vote',
    subject: 'Thanks for supporting Liquid Democracy',
    html: `Hi ${firstName || ''},

    Here's confirmation of your endorsement and/or pledge for Liquid Democracy, via <a href="https://contribute.liquid.vote">https://contribute.liquid.vote</a>.

    Endorsement: ${req.body.endorsement || ''}
    Display Name: ${req.body.displayName || ''}
    ZIP: ${req.body.zip || ''}

    Pledge: $${req.body.pledge || '0'}

    We'll let you know when the campaign launches, and follow-up about payment processing then.

    Thank you!`.replace(/(\n)/g, '<br />'),
  })

}
