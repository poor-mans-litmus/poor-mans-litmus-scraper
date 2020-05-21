const fs = require('fs')
const axios = require('axios')
const FormData = require('form-data')
const config = require('../config')

module.exports = {
  async sleep (delay) {
    await new Promise(r => setTimeout(r, delay))
  },

  upload (id, result) {
    const form = new FormData()
    form.append('id', id)
    form.append('screenshot', fs.createReadStream(result))

    axios.post(`${config.screenshots.baseUrl}/api/screenshots`, form, { headers: form.getHeaders() })
      .then(_ => console.log(`${result} uploaded`))
      .catch(err => console.log(`${result} upload failed`, err.response ? err.response.data : err))
  },
}
