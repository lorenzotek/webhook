const superagent = require('superagent')

module.exports = async (hookURL, messageId, payload) => {
  const res = await superagent.patch(`${hookURL}/messages/${messageId}`)
    .set('Content-Type', 'application/json')
    .send(payload)
  return res
}