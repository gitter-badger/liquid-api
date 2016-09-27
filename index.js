// Grab our .env environment variables
require('dotenv').config()

console.log('Connecting to db...')
require('rethinkdb').connect({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  db: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  ssl: { ca: process.env.DB_SSL_CERT },
})
.tap(dbConn => console.log('Connected to db as user:', dbConn.rawSocket.user))
.then(dbConn => {
  var app = require('express')()

  // Store the db connection for later
  app.locals.dbConn = dbConn

  app.use(require('body-parser').json()) // Enable json parsing
  app.disable('x-powered-by') // remove 'x-powered-by' header

  // Define routes
  app.get('/', (req, res) => res.send('Hello world'))
  app.get('/voters', require('./get-num-voters.js'))
  app.post('/voters', require('./create-voter.js'))
  app.post('/login-by-email', require('./login-by-email.js'))

  // Start Express server
  app.listen(process.env.PORT, () => console.log('Server listening on port', process.env.PORT))
})
