// GET /location
//
// Hit this endpoint to location information about the requesting api
//
// Response:
//

module.exports = (req, res) => {
  res.send(`Hi ${req.ips}🐬`)
}
