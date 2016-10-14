// Grab our .env environment variables
require('dotenv').config({ silent: true })

console.log('Connecting to db...')
require('rethinkdb').connect({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  db: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  ssl: {
    ca: process.env.DB_SSL_CERT,
    rejectUnauthorized: false, // TODO: temp fix for Heroku rejecting self-signed ssl certificate
  },
})
.tap(dbConn => console.log('Connected to db as user:', dbConn.rawSocket.user))
.then((dbConn) => {
  const app = require('express')()

  // Store the db connection for later
  app.locals.dbConn = dbConn

  app.disable('x-powered-by') // remove 'x-powered-by' header
  app.use(require('body-parser').json()) // Enable json parsing
  app.use(require('cors')())

  // Define routes
  app.get('/', (req, res) => res.send('Hello world'))
  app.get('/session/:session_id', require('./lookup-session.js'))
  app.get('/voters', require('./get-num-voters.js'))
  app.put('/voters/:voter_id', require('./update-voter-info.js'))
  app.post('/login-by-email', require('./login-by-email.js'))
  app.post('/subscribe', require('./subscribe.js'))
  app.get('/sf-ballot-measures', require('./get-ballot-measures.js'))
  app.get('/sf-ballot-measures/votes/:voter_id', require('./get-ballot-measures-votes.js'))

  // Start Express server
  app.listen(process.env.PORT, () => console.log('Server listening on port', process.env.PORT))
})
