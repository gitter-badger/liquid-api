// GET /sf-ballot-measures
//
// Hit this endpoint to get the November 8, 2016 SF Ballot Measures
//
// Response:
//
//   [
//     {
//      name: 'Proposition A: San Francisco Unified School District Bond Issue',
//      letter: 'A',
//      more_info: 'https://ballotpedia.org/San_Francisco_Unified_School_District,_California,_Bond_Issue,_Proposition_A_(November_2016)'
//     },
//     ...
//   ]
//

const ballotMeasures = [
  {
    name: 'Proposition A: San Francisco Unified School District Bond Issue',
    letter: 'A',
    more_info_url: '',
  },
  {
    name: 'Proposition B: San Francisco Community College',
    letter: 'B',
    more_info_url: '',
  },
  {
    name: 'Proposition C: San Francisco Affordable Housing Bond Issue',
    letter: 'C',
    more_info_url: '',
  },
  {
    name: 'Proposition D: San Francisco Vacancy Appointments',
    letter: 'D',
    more_info_url: '',
  },
  {
    name: 'Proposition E: San Francisco City Responsibility for Street Trees and Sidewalks Amendment',
    letter: 'E',
    more_info_url: '',
  },
  {
    name: 'Proposition F: San Francisco Youth Voting in Local Elections',
    letter: 'F',
    more_info_url: '',
  },
  {
    name: 'Proposition G: San Francisco Police Oversight Amendment',
    letter: 'G',
    more_info_url: '',
  },
  {
    name: 'Proposition H: San Francisco Establishment of a Public Advocate Office Amendment',
    letter: 'H',
    more_info_url: '',
  },
  {
    name: 'Proposition I: San Francisco Funding for Seniors and Adults with Disabilities Amendment',
    letter: 'I',
    more_info_url: '',
  },
  {
    name: 'Proposition J: San Francisco Homeless Servicess and Transportation Funds Amendment',
    letter: 'J',
    more_info_url: '',
  },
  {
    name: 'Proposition K: San Francisco Sales Tax Increase',
    letter: 'K',
    more_info_url: '',
  },
  {
    name: 'Proposition L: San Francisco Municipal Transportation Agency Governance Amendment',
    letter: 'L',
    more_info_url: '',
  },
  {
    name: 'Proposition M: San Francisco Housing and Development Commission Establishment Amendment',
    letter: 'M',
    more_info_url: '',
  },
  {
    name: 'Proposition N: San Francisco Non-Citizen Voting in School Board Elections',
    letter: 'N',
    more_info_url: '',
  },
  {
    name: 'Proposition O: San Francisco Office Development in Candlestick Point and Hunters Point',
    letter: 'O',
    more_info_url: '',
  },
  {
    name: 'Proposition P: San Francisco Minimum Three-Proposal Requirement for Affordable Housing Projects on City Property',
    letter: 'P',
    more_info_url: '',
  },
  {
    name: 'Proposition Q: San Francisco Prohibiting Tents on Public Sidewalks',
    letter: 'Q',
    more_info_url: '',
  },
  {
    name: 'Proposition R: San Francisco Neighborhood Crime Unit Creation',
    letter: 'R',
    more_info_url: '',
  },
  {
    name: 'Proposition S: San Francisco Allocation of Hotel Tax Funds',
    letter: 'S',
    more_info_url: '',
  },
  {
    name: 'Proposition T: San Francisco Restricting Gifts and Campaign Contributions from Lobbyists',
    letter: 'T',
    more_info_url: '',
  },
  {
    name: 'Proposition U: San Francisco Income Qualifications for Affordable Housing',
    letter: 'U',
    more_info_url: '',
  },
  {
    name: 'Proposition V: San Francisco Soda and Sugary Beverages Tax',
    letter: 'V',
    more_info_url: '',
  },
  {
    name: 'Proposition W: San Francisco Real Estate Transfer Tax',
    letter: 'W',
    more_info_url: '',
  },
  {
    name: 'Proposition X: San Francisco Replacement Space Requirement for Development Projects',
    letter: 'X',
    more_info_url: '',
  },
  {
    name: 'Measure RR: San Francisco San Francisco Bay Area Rapid Transit District',
    letter: '',
    more_info_url: '',
  },
]

module.exports = (req, res) => {
  res.status(200).send(ballotMeasures)
}
