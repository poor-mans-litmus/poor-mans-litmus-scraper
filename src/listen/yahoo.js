module.exports = {
  email: '',

  init (config) {
    this.email = config.yahoo.email
  },

  canHandle (data) {
    return data.to === this.email
  },

  async handle (browser, config, data) {
    const page = await browser.newPage()
    await page.goto('https://mail.yahoo.com/b/')

    await page.waitForSelector('input[name=s]')
    await page.focus('input[name=s]')
    await page.keyboard.type(data.subject)
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle0' }),
      page.keyboard.press('Enter')
    ])

    await page.waitForSelector('td[data-test-id=subject] a')
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle0' }),
      page.click('td[data-test-id=subject] a')
    ])

    await page.waitForSelector('#content')
    await page.screenshot({
      path: `./screenshots/${data.subject}-yahoo.jpg`,
      fullPage: true,
    })

    await page.close()
  }
}
