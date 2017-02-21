/* eslint-disable sort-keys */

// Manually connect to db
//
// Usage:
//
//    const db = require('./db.js')
//    const r = require('rethinkdb')
//
//    db().then(dbConn =>
//      r.table('users').run(dbConn).call('toArray')
//      .then(console.log)
//    )


require('dotenv').config({ silent: true })

function connect() {
  console.log('Connecting to db...')
  return require('rethinkdb').connect({
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
}

module.exports = connect
