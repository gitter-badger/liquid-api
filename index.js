var r = require('rethinkdb')

// Grab our .env environment variables
require('dotenv').config()
const DB_CERT = require('fs').readFileSync('./.db_cert.ca')

console.log('Connecting to db...')
r.connect({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  db: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  ssl: { ca: DB_CERT },
})
.tap(dbConn => console.log('Connected to db as user:', dbConn.rawSocket.user))
.then(dbConn => {
  var app = require('express')()

  // Store the db connection for later
  app.locals.dbConn = dbConn

  // Enable json parsing
  app.use(require('body-parser').json())

  // Define routes
  app.get('/', (req, res) => res.send('Hello world'))
  app.post('/voters', require('./create-voter.js'))
  app.post('/login-by-email', require('./login-by-email.js'))

  // Start Express server
  app.listen(3000, () => console.log('Server listening on port 3000')) // eslint-disable-line no-console
})
