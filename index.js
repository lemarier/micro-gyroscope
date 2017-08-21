const ms = require('ms')
const { providers, server } = require('./lib')

/**
 * Logs data to slack and console
 * @param  {String} data
 */
const log = data => {
  console.log(data)
}

/**
 * Update database cache from providers
 * @return {Promise}
 */
const updateCache = async () => {
  // save timestamp to calc the elapsed time
  const start = Date.now()

  // extract data from providers
  const value = await providers()

  // update API cache value on the server
  server.save(value)

  // log it
  log(`Re-built cache. Elapsed: ${new Date() - start}ms`)
}

// update cache
updateCache()

// set timer to update every 15 minutes
setInterval(updateCache, ms('15m'))

// Expose the server handler for micro
module.exports = server.handler
