require('dotenv').config()

const config = require('./src/config')
const Puppeteer = require('puppeteer')
const login = require('./src/login/login')
const listen = require('./src/listen/listen')

async function main() {
  console.log(config)

  const chrome = await browser(config.browser)

  await login(chrome, config)

  listen(chrome, config)
}

async function browser(browserConfig) {
  return Puppeteer.launch({
    headless: browserConfig.headless,
    defaultViewport: {
      width: 1024,
      height: 768,
    }
  })
}

main()
