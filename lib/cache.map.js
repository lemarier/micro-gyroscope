// scrape-it mapping
const numeral = require('numeral')

module.exports = {
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
