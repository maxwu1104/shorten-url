const Url = require('../models/shortenUrl')

function getRandomWords (amount) {
  const upperWord = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lowerWord = 'abcdefghijklmnopqrstuvwxyz'
  const number = '1234567890'
  const string = upperWord + lowerWord + number

  let words = ''

  for (let i = 0; i < amount; i++) {
    words += string.charAt(Math.floor(Math.random() * string.length))
  }

  return Url.findOne({ shortUrl: { $regex: `${words}` } })
    .lean()
    .exec()
    .then((url) => {
      if (url) {
        return getRandomWords(amount)
      } else {
        return words
      }
    })
}

module.exports = getRandomWords
