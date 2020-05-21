const { sleep } = require('./../utils/utils')

module.exports = {
  email: '',
  maxAttempts: 20,

  init (config) {
    this.email = config.yahoo.email
  },

  canHandle (data) {
    return data.to.includes(this.email)
  },

  async handle (browser, config, data) {
    const page = await browser.newPage()
    await page.goto('https://mail.yahoo.com/b/')

    let attempts = 0
    let resultExists = false
    while (!resultExists) {
      attempts++
      if (attempts > this.maxAttempts) {
        console.log(`Can't find email after ${this.maxAttempts} attempts`)
        page.close()
        return
      }

      await page.waitForSelector('input[name=s]')
      await page.focus('input[name=s]')

      if (attempts === 1) {
        await page.keyboard.type(data.subject)
      } else {
        await sleep(30000)
      }

      await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
        page.keyboard.press('Enter')
      ])

      resultExists = Boolean(await page.$('td[data-test-id=subject] a'))
    }

    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle0' }),
      page.click('td[data-test-id=subject] a')
    ])

    await page.waitForSelector('#content')

    let file = `./screenshots/${data.subject}-yahoo.jpg`
    await page.screenshot({
      path: file,
      fullPage: true,
    })

    await page.close()

    return file
  }
}
