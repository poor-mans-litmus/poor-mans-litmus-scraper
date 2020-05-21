module.exports = {
  services: process.env.APP_SERVICES.split(','),
  browser: {
    headless: process.env.BROWSER_HEADLESS === 'true',
  },
  yahoo: {
    email: process.env.YAHOO_EMAIL,
    password: process.env.YAHOO_PASSWORD,
  },
  gmail: {
    email: process.env.GMAIL_EMAIL,
    password: process.env.GMAIL_PASSWORD,
  }
}
