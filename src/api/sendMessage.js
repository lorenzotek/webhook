const superagent = require('superagent')

module.exports = async (hookURL, payload) => {
  const res = await superagent.post(`${hookURL}?wait=true`)
    .set('Content-Type', 'application/json')
    .send(payload)
  return res
}