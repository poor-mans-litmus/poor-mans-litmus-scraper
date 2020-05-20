const Puppeteer = require('puppeteer')
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
})

async function main() {
  const chrome = await browser()

  // login to yahoo
  const page = await chrome.newPage()
  await page.goto('https://mail.yahoo.com/b/')
  await page.waitForSelector('#login-username')
  await page.focus('#login-username')

  readline.question('Yahoo! username: ', async answer => {
    await page.keyboard.type(answer)
    await page.click('#login-signin')
  })

  await page.waitForSelector('#login-passwd', { timeout: 0 })
  await page.focus('#login-passwd')

  readline.question('Yahoo! password: ', async answer => {
    await page.keyboard.type(answer)
    await page.click('#login-signin')
    readline.close()
  })

  await page.waitForSelector('#messageListContainer')
  console.log('Successful login')
  await page.screenshot({
    path: 'screenshots/test.jpg',
    fullPage: true,
  })
}

async function browser() {
  return Puppeteer.launch({
    defaultViewport: {
      width: 1024,
      height: 768,
    }
  })
}

main()
