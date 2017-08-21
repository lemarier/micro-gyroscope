const { PROVIDERS } = require('../config')
let loader = []
let data = {} // → need to be object as it'll be converted to JSON

// prepare the loader and require all plugins
for (let provider of PROVIDERS) {
  loader[provider] = require(`../providers/${provider}`)
}

/**
 * Async function to load all plugins and run them
 * in series to extract datas
 * @return {Promise}
 */
module.exports = async () => {
  const start = Date.now()

  // should await all plugins.
  for (let provider of PROVIDERS) {
    try {
      // exec the provider and save into 'data[provider name]'
      data[provider] = await loader[provider]()
    } catch (e) {
      console.log(e)
      data[provider] = {}
    }
  }

  // return array
  return {
    extractTime: new Date() - start, // → 1422
    lastUpdate: Date.now(), // → 1503325277934
    data // --> Object
  }
}
