module.exports = async function (browser, config) {
  const page = await browser.newPage()
  await page.goto('https://mail.yahoo.com/b/')

  await page.waitForSelector('#login-username')
  await page.focus('#login-username')
  await page.keyboard.type(config.yahoo.email)
  await page.keyboard.press('Enter')

  await page.waitForSelector('#login-passwd')
  await page.focus('#login-passwd')
  await page.keyboard.type(config.yahoo.password)
  await page.keyboard.press('Enter')

  await page.waitForSelector('#messageListContainer')
  console.log('Successful login')
  await page.screenshot({
    path: 'screenshots/login-yahoo.jpg',
    fullPage: true,
  })

  await page.close()
}
