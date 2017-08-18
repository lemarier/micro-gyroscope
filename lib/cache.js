const scrapeIt = require('scrape-it')
const numeral = require('numeral')

const map = require('./cache.map')

// cached template object
let template = {
  steps: 0,
  weight: 0,
  weightUnits: false,
  heartRate: 0,
  heartRateUnits: false
}

const scrape = username => {
  return scrapeIt(`https://gyrosco.pe/${username}/zero/sport/`, map)
}

const aggregate = async data_ => {
  let total = 0
  for (var i = 0, _len = data_.length; i < _len; i++) {
    total += data_[i].steps.total
  }
  return total
}

module.exports = async username => {
  try {
    // extract data
    const data_ = await scrape(username)

    // build the total steps
    const steps = await aggregate(data_.extractedData)

    const kms = parseInt(numeral(steps * 0.000762).value())
    // update the template with DB value
    template = {
      steps,
      kms,
      weight: numeral(data_.weight).value(),
      weightUnits: data_.weightUnits,
      heartRate: numeral(data_.heartRate).value(),
      heartRateUnits: data_.heartRateUnits
    }
  } catch (e) {
    // catch error
    console.log(e)
  }

  // return value
  return template
}
