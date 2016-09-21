// POST /voters — An API endpoint to create a new user in the system.
//
// Expects:
//
// body
// {
//   full_name: String <1 – 100 characters>,
//   email: String, email regex, <1 - 200 characters>,
//   zip: number, 0 < x < 99999,
// }

module.exports = (req, res) => {
  const { full_name, email, zip } = req.body
  console.log('full_name', full_name)
  console.log('email', email)
  console.log('zip', zip)
  res.send('Thanks')
}
