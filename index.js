const ms = require('ms')
const cache = require('./lib/cache')
const server = require('./lib/server')

const { username } = require('./config')

// bind log function to be reused later
const log = data => {
  console.log(data)
}

// update cache function
const updateCache = async () => {
  // save timestamp to calc the elapsed time
  const start = Date.now()

  // extract data
  const value = await cache(username)

  // update API cache value on the server
  server.save(value)

  // log it
  log(
    `Re-built gyroscope cache. ` +
      `Total: ${value.steps} steps. ` +
      `Elapsed: ${new Date() - start}ms`
  )
}

// cache now
updateCache()

// update every 15 mins
setInterval(updateCache, ms('15m'))

// Micro API server
module.exports = server.handler
