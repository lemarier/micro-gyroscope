// API cache value
let data = {}

// update data cache
module.exports.save = data_ => (data = data_)

// handler function for the micro api
module.exports.handler = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET')
  return data
}
