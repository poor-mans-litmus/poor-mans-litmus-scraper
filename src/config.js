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
  },
  pusher: {
    key: process.env.PUSHER_KEY,
    cluster: process.env.PUSHER_CLUSTER,
  },
  screenshots: {
    baseUrl: process.env.SCREENSHOTS_BASE_URL,
  }
}
