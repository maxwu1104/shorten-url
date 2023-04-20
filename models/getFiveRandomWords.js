function getFiveRandomWords () {
  const upperWord = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lowerWord = 'abcdefghijklmnopqrstuvwxyz'
  const number = '1234567890'
  const string = upperWord + lowerWord + number

  let words = ''

  for (let i = 0; i < 5; i++) {
    words += string.charAt(Math.floor(Math.random() * string.length))
  }

  return words
}

module.exports = getFiveRandomWords
