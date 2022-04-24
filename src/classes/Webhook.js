const { sendMessage, editMessage, deleteMessage, sendFile } = require('../api')
const Embed = require('./Embed')

module.exports = class Webhook {
  constructor(url) {
    this.hookURL = url
    this.payload = {}
  }

  setUsername(username) {
    this.username = username
    this.payload.username = username
    return this
  }

  setAvatar(avatar) {
    this.avatar = avatar
    this.payload.avatar_url = avatar
    return this
  }

  async sendFile(filePath) {
  try {
    const res = await sendFile(this.hookURL, filePath, this.payload)

    if (res.statusCode != 200){
      throw new Error(`Error sending webhook: ${res.statusCode} status code.`)
    }
  }
  catch(err){
    if (this.throwErrors) throw new Error(err.message)
  }
}

  async send(payload) {
    let endPayload = {...this.payload}
    if (typeof payload === 'string'){
      endPayload.content = payload
    } else {
      if(payload instanceof Embed) endPayload.embeds = [payload.build()]

      if(payload instanceof Array){
        payload.map(p => {
          if(typeof p === 'string') {
            if(!endPayload.content) endPayload.content = p
            else endPayload.content += '\n' + p
          }
          if(p instanceof Embed) {
            if(!endPayload.embeds) endPayload.embeds = []
            endPayload.embeds.push(p.build())
          }
        })
      } else {
        endPayload = {
          ...endPayload,
          ...payload
        }
      }
    }
    
    const res = await sendMessage(this.hookURL, endPayload)
    return res.body.id
  }

  async edit(messageId, payload) {
    const endPayload = typeof payload == 'string' ? {content: payload} : payload
    await editMessage(this.hookURL, messageId, endPayload)
  }

  async delete(messageId) {
    await deleteMessage(this.hookURL, messageId)
  }
}