module.exports = async function (browser, config) {
  const page = await browser.newPage()

  // Attempt to access the basic Gmail site.
  // This login flow attempts that the account
  // already completed the following:
  // - Accessed the Basic version of Gmail once.
  // - Confirmed the mobile number.
  // - Does not have 2FA enabled.
  // Pretend to be an old browser (IE7) to access
  // Google's non-fancy login page.
  await page.setUserAgent('Mozilla/4.0(compatible; MSIE 7.0b; Windows NT 6.0)')
  await page.goto('https://mail.google.com/mail/h')

  await page.waitForSelector('input[type=email]')
  await page.focus('input[type=email]')
  await page.keyboard.type(config.gmail.email)
  await page.keyboard.press('Enter')

  await page.waitForSelector('input[type=password]')
  await page.focus('input[type=password]')
  await page.keyboard.type(config.gmail.password)
  await page.keyboard.press('Enter')

  await page.waitForSelector('table[bgcolor="#e8eef7"]')
  console.log('Successful login')
  await page.screenshot({
    path: 'screenshots/login-gmail.jpg',
    fullPage: true,
  })

  await page.close()
}
