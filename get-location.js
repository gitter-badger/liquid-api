// GET /location
//
// Hit this endpoint to location information about the requesting api
//
// Response:
//

const geoip2ws = require('geoip2ws')(process.env.MAXMIND_USERID, process.env.MAXMIND_LICENSE_KEY)

module.exports = (req, res) => {

  const ip = req.ips[0] || process.env.EXAMPLE_IP

  geoip2ws(ip, (err, geo) => {
    console.log('geo:', geo)
    res.send(`🐬 Hi \n\n ${JSON.stringify(geo)}`)
  })
}
