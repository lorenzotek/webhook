# simple-discord-wh
![version](https://img.shields.io/npm/v/simple-discord-wh "Version")
![npm](https://img.shields.io/npm/dt/simple-discord-wh.svg "Total Downloads")
[![Total alerts](https://img.shields.io/lgtm/alerts/g/wrong7/simple-discord-wh.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/wrong7/simple-discord-wh/alerts/)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/wrong7/simple-discord-wh.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/wrong7/simple-discord-wh/context:javascript)

Manage Discord's webhook with a simple class

- [Installation](#installation)
- [Examples](#examples)
    - [Basic use](#basic-use)
    - [Custom embeds](#custom-embeds)
    - [Sending files](#sending-files)
- [Notes](#notes)
- [API](#api)
    - [Webhook](#webhook---class)
    - [Embed](#embed---class)
- [License](#license)

# Installation
```npm install simple-discord-wh```

# Examples

## Basic use
```js
const { Webhook } = require('simple-discord-wh');
const wh = new Webhook("YOUR WEBHOOK URL");

const IMAGE_URL = 'https://avatars.githubusercontent.com/u/6708827?s=120&v=4'
wh.setUsername('Simple Webhook');
wh.setAvatar(IMAGE_URL);

wh.send("Hello there"!);

wh.send({content: "This is also valid"})
  .then((messageId) => {
    wh.edit(messageId, "Hello there! This message has been edited.");
    wh.delete(messageId);
  });
  .catch(err => console.log(err.message));
```

## Custom embeds

```js
const { Webhook, MessageBuilder } = require('simple-discord-wh');
const wh = new Webhook("YOUR WEBHOOK URL");

const embed = new MessageBuilder()
.setTitle('Custom title')
.setAuthor('Walrus', 'https://avatars.githubusercontent.com/u/6708827?s=120&v=4', 'https://www.google.com')
.setURL('https://www.google.com')
.addField('First field', 'this is inline', true)
.addField('Second field', 'this is not inline')
.setColor('#00b0f4')
.setThumbnail('https://avatars.githubusercontent.com/u/6708827?s=120&v=4')
.setDescription('The walrus (Odobenus rosmarus) is a large flippered marine mammal')
.setImage('https://avatars.githubusercontent.com/u/6708827?s=120&v=4')
.setFooter('Hey its a footer', 'https://avatars.githubusercontent.com/u/6708827?s=120&v=4')
.setTimestamp();
```

The webhook can be sent with one of the following lines:

```js
embed.send(wh)
```

```js
wh.send(embed)
```

```js
wh.send(["This will also include a text", embed])
```

```js
wh.send({embeds: [embed.build()]})
```

## Sending files
```js
const { Webhook } = require('simple-discord-wh');
const wh = new Webhook('YOUR WEBHOOK URL');

wh.sendFile('../yourfilename.png');
```

# Notes
simple-discord-wh is a promise based library, which means you can use `.catch`, `.then`, and `await`. If successful when sending a new message, the returned value will be the id of the message sent. For example:

```js
const { Webhook } = require('simple-discord-wh');
const wh = new Webhook("YOUR WEBHOOK URL");

wh.send("Hello there!")
.then(() => console.log('Sent webhook successfully!'))
.catch(err => console.log(err.message));
```

or using async:
```js
const { Webhook } = require('simple-discord-wh');
const wh = new Webhook("YOUR WEBHOOK URL");

(async () => {
    try {
        const messageId = await wh.send('Hello there!');
        console.log('Successfully sent webhook!');
        console.log('New message id:', messageId)
    }
    catch(e){
        console.log(e.message);
    };
})();
```

# API
## Webhook - class
Constructor
- url : string

Methods
- setUsername(username : string) returns this
- setAvatar(avatarURL : string (image url)) returns this
- async sendFile(filePath : string)
- async send(payload : string/Embed/object) returns messageId
- async edit(messageId : integer, payload: string/Embed)
- async delete(messageId : integer)

## Embed - class
Methods
- setAuthor(author: string, authorImage (optional) : string (image url), authorUrl (optional) : string (link))
- setTitle(title: string)
- setURL(url: string)
- setDescription(description : string)
- setColor(color : string/number (hex or decimal color))
- setThumbnail(thumbnail : string (image url), proxyImage (optional) : string (proxy image url), height (optional) : integer, width (optional) : integer)
- setImage(image : string (image url), proxyImage (optional) : string (proxy image url), height (optional) : integer, width (optional) : integer)
- setVideo(video : string (video url), proxyVideo (optional) : string (proxy video url), height (optional) : integer, width (optional) : integer)
- setTimestamp(date (optional) : number/date object)
- addField(fieldName : string, fieldValue: string, inline (optional) : boolean)
- setFooter(footer : string, footerImage (optional) : string (image url), footerProxyImage (optional) : string (proxy image url))
- setProvider(name : string, url : string (url))
- build()

# License

MIT