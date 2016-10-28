const mailgun = new (require('mailgun-js'))({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN })

module.exports = email => mailgun.messages().send({
  from: `Liquid Vote <info@${process.env.MAILGUN_DOMAIN}>`,
  to: email,
  bcc: 'david@liquid.vote',
  subject: 'Liquid Democracy signup confirmed',
  html: `Hi,

  This confirms your registration to stay tuned about Liquid Democracy. Thank you.

  We'll keep you in the loop about major announcements, such as when the first version of the Liquid Democracy app is available.

  For now, you're invited to come say hi in <a href="https://gitter.im/liquidvote/org">our chatroom</a> and share links about Liquid Democracy with your friends and family:

  <em>Liquid Democracy promises to empower our most trustworthy leaders, give us true choice and accountability, and transform our politics and society. It does this all without requiring more effort for the voter than our current representative system.</em>

  Learn more at <a href="http://liquid.vote">http://liquid.vote</a>.

  Thanks!`.replace(/(\n)/g, '<br />'),
})
