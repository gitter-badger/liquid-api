var express = require('express')
var app = express()

app.use(require('body-parser').json())

app.get('/', (req, res) => res.send('Hello world'))
app.post('/voters', require('./create-voter.js'))

app.listen(3000, () => console.log('Server listening on port 3000'))
