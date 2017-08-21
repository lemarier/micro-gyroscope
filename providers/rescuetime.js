const { RESCUETIME_TOKEN } = require('../config')
const fetch = require('node-fetch')

// cached template object
let template = {
  very_productive: 0,
  productive: 0,
  neutral: 0,
  unproductive: 0,
  very_unproductive: 0,
  total_productive: 0,
  total_unproductive: 0
}

module.exports = async () => {
  // fetch rescuetime current data
  const data = await fetch(
    `https://www.rescuetime.com/anapi/data?key=${RESCUETIME_TOKEN}&perspective=interval&restrict_kind=productivity&format=json`
  )
  const json = await data.json()

  // analyze each row and compile into final template
  for (let row of json.rows) {
    // row[3] === 2  → very_productive
    // row[3] === 1  → productive
    // row[3] === 0  → neutral
    // row[3] === -1 → unproductive
    // row[3] === -2 → very_unproductive

    template.very_productive += row[3] === 2 ? row[1] : 0
    template.productive += row[3] === 1 ? row[1] : 0
    template.neutral += row[3] === 0 ? row[1] : 0
    template.unproductive += row[3] === -1 ? row[1] : 0
    template.very_unproductive += row[3] === -2 ? row[1] : 0
  }

  template.total_productive = template.very_productive + template.productive
  template.total_unproductive =
    template.very_unproductive + template.unproductive

  return template
}
