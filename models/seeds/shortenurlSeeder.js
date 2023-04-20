const db = require('../../config/mongoose')
const Url = require('../shortenurl')

db.once('open', () => {
  Url.create({
    url: 'https://www.google.com/',
    newUrl: 'https://brand/eg02E'
  })
  console.log('DataSeeder is created.')
})
