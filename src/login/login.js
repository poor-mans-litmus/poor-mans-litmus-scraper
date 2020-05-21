module.exports = async function (browser, config) {
  for (let i = 0; i < config.services.length; i++) {
    let loginService = require(`./${config.services[i]}`)
    await loginService(browser, config)
  }
}
