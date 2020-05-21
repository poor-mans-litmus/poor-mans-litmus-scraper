const Pusher = require('pusher-js')
const { upload } = require('../utils/utils')

const handlers = []

function initHandlers (config) {
  console.log('Initializing handlers')

  config.services.forEach(service => {
    let handler = require(`./${service}`)
    handlers.push(handler)
  })

  handlers.forEach(handler => handler.init(config))
}

module.exports = function (browser, config) {
  initHandlers(config)

  console.log('Connecting to Pusher')

  let pusher = new Pusher(config.pusher.key, {
    cluster: config.pusher.cluster,
  })

  let channel = pusher.subscribe('crawlers')
  channel.bind('App\\Events\\MailSent', async data => {

    console.log('Received event', data)

    for (let i = 0; i < handlers.length; i++) {
      let handler = handlers[i]

      if (handler.canHandle(data)) {
        console.log('Event is being handled by', handler)

        let result = await handler.handle(browser, config, data)

        if (result) {
          upload(data.subject, result)
        }
      }
    }
  })

  console.log('Waiting for events')
}
