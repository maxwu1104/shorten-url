const db = require('../../config/mongoose')
const Url = require('../shortenUrl')

db.once('open', () => {
  Url.create({
    originUrl: 'https://www.google.com/',
    shortUrl: 'https://brand/eg02E'
  })
  console.log('DataSeeder is created.')
})
