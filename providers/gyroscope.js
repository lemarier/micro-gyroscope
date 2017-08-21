const scrapeIt = require('scrape-it')
const numeral = require('numeral')
const { GYROSCOPE_USERNAME } = require('../config')

// cached template object
let template = {
  steps: 0,
  weight: 0,
  weightUnits: false,
  heartRate: 0,
  heartRateUnits: false
}

// scrape-it mapping
const map = {
  name: '.user-name',
  section: '.section-title',
  heartRate: 'span.bpm-increment',
  heartRateUnits: '.heart-rate .units',
  weight: 'span.weight-increment',
  weightUnits: '.weight .units',
  extractedData: {
    listItem: '.month',
    data: {
      month: 'h2',
      steps: {
        selector: 'h3',
        how: 'html',
        convert: stepArray => {
          const returnSteps = {
            total: 0,
            average: 0
          }

          try {
            const splitted = stepArray.split(' &#xB7; ')
            returnSteps.total = numeral(splitted[0].split(' ')[0]).value()
            returnSteps.average = numeral(splitted[1].split(' ')[0]).value()
          } catch (e) {}

          return returnSteps
        }
      }
    }
  }
}

const scrape = () => {
  return scrapeIt(`https://gyrosco.pe/${GYROSCOPE_USERNAME}/zero/sport/`, map)
}

const aggregate = async data_ => {
  let total = 0
  for (var i = 0, _len = data_.length; i < _len; i++) {
    total += data_[i].steps.total
  }
  return total
}

module.exports = async () => {
  try {
    // extract data
    const data_ = await scrape()

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
