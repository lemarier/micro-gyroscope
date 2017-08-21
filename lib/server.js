const { send } = require('micro')

/**
 * Default data object
 * @type {Object}
 */
let data = {}

/**
 * Database state
 * @type {Boolean}
 */
let ready = false // → false by default

/**
 * Save database state
 * @param  {Object} newData
 */
module.exports.save = newData => {
  // app got at least one update
  ready = true
  // update cache data
  data = newData
}

/**
 * Micro server handler
 * @param  {Object}  req
 * @param  {Object}  res
 * @return {Promise}
 */
module.exports.handler = async (req, res) => {
  // ✅ update our header
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET')

  // 🚗 make sure to skip favicon to prevent duplicate call
  if (req.url.match(/favicon/)) {
    res.setHeader('Content-Type', 'image/x-icon')
    return send(res, 200, '')
  } else {
    // ➕ include database state
    // in the returned object
    data.ready = ready

    // 📤 return cached data
    return data
  }
}
