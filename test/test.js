require('dotenv').config()
const fs = require('fs').promises
const { Webhook, Embed } = require('../src')

const { WEBHOOK_URL } = process.env

const hook = new Webhook(WEBHOOK_URL)

const IMAGE_URL = 'https://avatars.githubusercontent.com/u/6708827?s=120&v=4'

hook.setUsername('Simple Webhook Tester')
hook.setAvatar(IMAGE_URL)

const sleep = ms => new Promise(r => setTimeout(r, ms));

describe('Custom hooks', () =>{
  beforeEach((done) =>{
    sleep(500).then(done)
  })

  it('Sends embed', (done) => {
    const embed = new Embed()

    .setAuthor(hook.username, hook.avatar, 'https://github.com/wrong7/simple-discord-wh')
    .setTitle('Title')
    .setURL('https://github.com/wrong7/simple-discord-wh')
    .setImage(IMAGE_URL)
    .setThumbnail(IMAGE_URL)
    .setColor('#00b0f4')
    .addField('Field #1', 'Not inline')
    .setDescription('Description')
    .setFooter('Footer', IMAGE_URL)
    .setTimestamp()

    hook.send({embeds: [embed.build()]}).then(() => {
      done()
    })
    .catch(err => done(err))
  })

  it('Sends file', (done) => {
    fs.writeFile('./test/customfile.txt', 'Message from discord-webhook-node').then(() => {
      hook.sendFile('./test/customfile.txt').then(() => {
        fs.unlink('./test/customfile.txt')

        done()
      })
      .catch(err => done(err))
    })
    .catch(err => done(err))
  })

  it('Sends text to webhook', (done) =>{
    hook.send('Plain text').then(() => {        
      done()
    })
    .catch(err => done(err))
  })

  it('Deletes message', (done) =>{
    hook.send('Plain text').then((messageId) => {
      hook.delete(messageId).then(() => {
      done()
      })
      .catch(err => done(err))
    })
    .catch(err => done(err))
  })

  it('Edits message', (done) =>{
    hook.send('Plain text').then((messageId) => {
      hook.edit(messageId, 'Edited text').then(() => {
        done()
      })
      .catch(err => done(err))
    })
    .catch(err => done(err))
  })

})