module.exports = class EmbedBuilder {
  constructor() {
    this.embed = {}
  }

  setAuthor(name, icon_url = null, url = null) {
    console.log(name)
    this.embed.author = {
      name: name
    }
    if (icon_url) this.embed.author.icon_url = icon_url
    if (url) this.embed.author.url = url
    return this
  }

  setTitle(title) {
    this.embed.title = title
    return this
  }

  setURL(url) {
    this.embed.url = url
    return this
  }

  setDescription(description) {
    this.embed.description = description
    return this
  }

  setColor(color) {
    if(typeof color == 'string') this.embed.color = parseInt(color.replace('#', '0x'), 16)
    else this.embed.color = color
    return this
  }

  setTimestamp(timestamp = new Date().toISOString()) {
    this.embed.timestamp = timestamp
    return this
  }

  addField(name, value, inline = false) {
    if (!this.embed.fields) {
      this.embed.fields = []
    }
    this.embed.fields.push({
      name: name,
      value: value,
      inline: inline
    })
    return this
  }

  setFooter(text, icon_url = null, proxy_icon_url = null) {
    this.embed.footer = {
      text: text
    }
    if (icon_url) this.embed.footer.icon_url = icon_url
    if (proxy_icon_url) this.embed.footer.proxy_icon_url = proxy_icon_url

    return this
  }

  setImage(url, proxy_url = null, height = null, width = null) {
    this.embed.image = {
      url: url
    }
    if (proxy_url) this.embed.image.proxy_url = proxy_url
    if (height) this.embed.image.height = height
    if (width) this.embed.image.width = width
    return this
  }

  setThumbnail(url, proxy_url = null, height = null, width = null) {
    this.embed.thumbnail = {
      url: url
    }
    if (proxy_url) this.embed.thumbnail.proxy_url = proxy_url
    if (height) this.embed.thumbnail.height = height
    if (width) this.embed.thumbnail.width = width
    return this
  }

  setVideo(url, proxy_url = null, height = null, width = null) {
    this.embed.video = {
      url: url
    }
    if (proxy_url) this.embed.video.proxy_url = proxy_url
    if (height) this.embed.video.height = height
    if (width) this.embed.video.width = width
    return this
  }

  setProvider(name, url) {
    this.embed.provider = {
      name: name,
      url: url
    }
    return this
  }

  build() {
    return this.embed
  }

  async send(Webhook) {
    return await Webhook.send({embeds: [this.build()]})
  }
}