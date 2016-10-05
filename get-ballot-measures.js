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
    href: '/San_Francisco_Unified_School_District,_California,_Bond_Issue,_Proposition_A_(November_2016)',
    title: 'San Francisco Unified School District, California, Bond Issue, Proposition A (November 2016)',
    type: 'Proposition',
    letter: 'A',
    name: 'San Francisco Unified School District Bond Issue',
  },
  {
    href: '/San_Francisco_Community_College,_California,_Parcel_Tax,_Proposition_B_(November_2016)',
    title: 'San Francisco Community College, California, Parcel Tax, Proposition B (November 2016)',
    type: 'Proposition',
    letter: 'B',
    name: 'San Francisco Community College',
  },
  {
    href: '/San_Francisco,_California,_Affordable_Housing_Bond_Issue,_Proposition_C_(November_2016)',
    title: 'San Francisco, California, Affordable Housing Bond Issue, Proposition C (November 2016)',
    type: 'Proposition',
    letter: 'C',
    name: 'San Francisco Affordable Housing Bond Issue',
  },
  {
    href: '/San_Francisco,_California,_Vacancy_Appointments,_Proposition_D_(November_2016)',
    title: 'San Francisco, California, Vacancy Appointments, Proposition D (November 2016)',
    type: 'Proposition',
    letter: 'D',
    name: 'San Francisco Vacancy Appointments',
  },
  {
    href: '/San_Francisco,_California,_City_Responsibility_for_Street_Trees_and_Sidewalks_Amendment,_Proposition_E_(November_2016)',
    title: 'San Francisco, California, City Responsibility for Street Trees and Sidewalks Amendment, Proposition E (November 2016)',
    type: 'Proposition',
    letter: 'E',
    name: 'San Francisco City Responsibility for Street Trees and Sidewalks Amendment',
  },
  {
    href: '/San_Francisco,_California,_Local_Elections_Voting_Age_Reduction_Amendment,_Proposition_F_(November_2016)',
    title: 'San Francisco, California, Local Elections Voting Age Reduction Amendment, Proposition F (November 2016)',
    type: 'Proposition',
    letter: 'F',
    name: 'San Francisco Youth Voting in Local Elections',
  },
  {
    href: '/San_Francisco,_California,_Police_Oversight_Amendment,_Proposition_G_(November_2016)',
    title: 'San Francisco, California, Police Oversight Amendment, Proposition G (November 2016)',
    type: 'Proposition',
    letter: 'G',
    name: 'San Francisco Police Oversight Amendment',
  },
  {
    href: '/San_Francisco,_California,_Establishment_of_a_Public_Advocate_Office_Amendment,_Proposition_H_(November_2016)',
    title: 'San Francisco, California, Establishment of a Public Advocate Office Amendment, Proposition H (November 2016)',
    type: 'Proposition',
    letter: 'H',
    name: 'San Francisco Establishment of a Public Advocate Office Amendment',
  },
  {
    href: '/San_Francisco,_California,_Funding_for_Seniors_and_Adults_with_Disabilities_Amendment,_Proposition_I_(November_2016)',
    title: 'San Francisco, California, Funding for Seniors and Adults with Disabilities Amendment, Proposition I (November 2016)',
    type: 'Proposition',
    letter: 'I',
    name: 'San Francisco Funding for Seniors and Adults with Disabilities Amendment',
  },
  {
    href: '/San_Francisco,_California,_Homeless_Services_and_Transportation_Funds_Amendment,_Proposition_J_(November_2016)',
    title: 'San Francisco, California, Homeless Services and Transportation Funds Amendment, Proposition J (November 2016)',
    type: 'Proposition',
    letter: 'J',
    name: 'San Francisco Homeless Servicess and Transportation Funds Amendment',
  },
  {
    href: '/San_Francisco,_California,_Sales_Tax_Increase,_Proposition_K_(November_2016)',
    title: 'San Francisco, California, Sales Tax Increase, Proposition K (November 2016)',
    type: 'Proposition',
    letter: 'K',
    name: 'San Francisco Sales Tax Increase',
  },
  {
    href: '/San_Francisco,_California,_Municipal_Transportation_Agency_Governance_Amendment,_Proposition_L_(November_2016)',
    title: 'San Francisco, California, Municipal Transportation Agency Governance Amendment, Proposition L (November 2016)',
    type: 'Proposition',
    letter: 'L',
    name: 'San Francisco Municipal Transportation Agency Governance Amendment',
  },
  {
    href: '/San_Francisco,_California,_Housing_and_Development_Commission_Establishment_Amendment,_Proposition_M_(November_2016)',
    title: 'San Francisco, California, Housing and Development Commission Establishment Amendment, Proposition M (November 2016)',
    type: 'Proposition',
    letter: 'M',
    name: 'San Francisco Housing and Development Commission Establishment Amendment',
  },
  {
    href: '/San_Francisco,_California,_Non-Citizen_Voting_in_School_Board_Elections_Amendment,_Proposition_N_(November_2016)',
    title: 'San Francisco, California, Non-Citizen Voting in School Board Elections Amendment, Proposition N (November 2016)',
    type: 'Proposition',
    letter: 'N',
    name: 'San Francisco Non-Citizen Voting in School Board Elections',
  },
  {
    href: '/San_Francisco,_California,_Office_Development_in_Candlestick_Point_and_Hunters_Point,_Proposition_O_(November_2016)',
    title: 'San Francisco, California, Office Development in Candlestick Point and Hunters Point, Proposition O (November 2016)',
    type: 'Proposition',
    letter: 'O',
    name: 'San Francisco Office Development in Candlestick Point and Hunters Point',
  },
  {
    href: '/San_Francisco,_California,_Minimum_Three-Proposal_Requirement_for_Affordable_Housing_Projects_on_City_Property,_Proposition_P_(November_2016)',
    title: 'San Francisco, California, Minimum Three-Proposal Requirement for Affordable Housing Projects on City Property, Proposition P (November 2016)',
    type: 'Proposition',
    letter: 'P',
    name: 'San Francisco Minimum Three-Proposal Requirement for Affordable Housing Projects on City Property',
  },
  {
    href: '/San_Francisco,_California,_Prohibiting_Tents_on_Public_Sidewalks,_Proposition_Q_(November_2016)',
    title: 'San Francisco, California, Prohibiting Tents on Public Sidewalks, Proposition Q (November 2016)',
    type: 'Proposition',
    letter: 'Q',
    name: 'San Francisco Prohibiting Tents on Public Sidewalks',
  },
  {
    href: '/San_Francisco,_California,_Neighborhood_Crime_Unit_Creation,_Proposition_R_(November_2016)',
    title: 'San Francisco, California, Neighborhood Crime Unit Creation, Proposition R (November 2016)',
    type: 'Proposition',
    letter: 'R',
    name: 'San Francisco Neighborhood Crime Unit Creation',
  },
  {
    href: '/San_Francisco,_California,_Allocation_of_Hotel_Tax_Funds,_Proposition_S_(November_2016)',
    title: 'San Francisco, California, Allocation of Hotel Tax Funds, Proposition S (November 2016)',
    type: 'Proposition',
    letter: 'S',
    name: 'San Francisco Allocation of Hotel Tax Funds',
  },
  {
    href: '/San_Francisco,_California,_Restrictions_on_Gifts_and_Campaign_Contributions_from_Lobbyists,_Proposition_T_(November_2016)',
    title: 'San Francisco, California, Restrictions on Gifts and Campaign Contributions from Lobbyists, Proposition T (November 2016)',
    type: 'Proposition',
    letter: 'T',
    name: 'San Francisco Restricting Gifts and Campaign Contributions from Lobbyists',
  },
  {
    href: '/San_Francisco,_California,_Increased_Income_Qualifications_for_Affordable_Housing,_Proposition_U_(November_2016)',
    title: 'San Francisco, California, Increased Income Qualifications for Affordable Housing, Proposition U (November 2016)',
    type: 'Proposition',
    letter: 'U',
    name: 'San Francisco Income Qualifications for Affordable Housing',
  },
  {
    href: '/San_Francisco,_California,_Soda_and_Sugary_Beverages_Tax,_Proposition_V_(November_2016)',
    title: 'San Francisco, California, Soda and Sugary Beverages Tax, Proposition V (November 2016)',
    type: 'Proposition',
    letter: 'V',
    name: 'San Francisco Soda and Sugary Beverages Tax',
  },
  {
    href: '/San_Francisco,_California,_Real_Estate_Transfer_Tax_Increase,_Proposition_W_(November_2016)',
    title: 'San Francisco, California, Real Estate Transfer Tax Increase, Proposition W (November 2016)',
    type: 'Proposition',
    letter: 'W',
    name: 'San Francisco Real Estate Transfer Tax',
  },
  {
    href: '/San_Francisco,_California,_Replacement_Space_Requirement_for_Development_Projects,_Proposition_X_(November_2016)',
    title: 'San Francisco, California, Replacement Space Requirement for Development Projects, Proposition X (November 2016)',
    type: 'Proposition',
    letter: 'X',
    name: 'San Francisco Replacement Space Requirement for Development Projects',
  },
  {
    href: '/San_Francisco_Bay_Area_Rapid_Transit_District,_California,_Bond_Issue,_Measure_RR_(November_2016)',
    title: 'San Francisco Bay Area Rapid Transit District, California, Bond Issue, Measure RR (November 2016)',
    type: 'Measure',
    letter: 'RR',
    name: 'San Francisco San Francisco Bay Area Rapid Transit District',
  },
]

module.exports = (req, res) => {
  res.status(200).send(ballotMeasures)
}
