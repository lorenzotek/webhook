const superagent = require('superagent')

module.exports = async (hookURL, messageId) => {
  const res = await superagent.delete(`${hookURL}/messages/${messageId}`)
  return res
}

