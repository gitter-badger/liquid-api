// Returns a list of voters that live in San Francisco

const db = require('./db.js')
const r = require('rethinkdb')

// Zip codes within San Francisco
const sfZipCodes = [94102, 94103, 94104, 94105, 94107, 94108, 94109, 94110, 94111, 94112, 94114, 94115, 94116, 94117, 94118, 94121, 94122, 94123, 94124, 94127, 94129, 94130, 94131, 94132, 94133, 94134, 94158].map(String)

db().then(dbConn =>

  r
    .table('users')
    .filter(doc =>
      r.expr(sfZipCodes).contains(doc('zip'))
    )
    .run(dbConn).call('toArray')
    .map(doc => doc.email)
    .then(console.log)

)
