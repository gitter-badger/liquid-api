// POST /feedback

const mailgun = new (require('mailgun-js'))({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN })

module.exports = (req, res) => {
  const { text, user } = req.body

  if (!text) {
    return res.status(400).send('Missing text')
  }

  mailgun.messages().send({
    from: `LV Feedback <info@${process.env.MAILGUN_DOMAIN}>`,
    to: 'info@liquid.vote',
    subject: 'Liquid Vote feedback', // eslint-disable-line sort-keys
    // eslint-disable-next-line sort-keys
    html: `${text}

    ---
    from: ${user.full_name}
    id: ${user.id}
    email: ${user.email}
    zip: ${user.zip}
    `.replace(/(\n)/g, '<br />'),
  })

  res.status(201).send('Feedback received.')
}
