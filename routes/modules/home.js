const express = require('express')
const router = express.Router()
const Url = require('../../models/shortenUrl')
const getRandomWords = require('../../utils/getRandomWords')

router.get('/', (req, res) => res.render('index'))

router.get('/:shortUrl', (req, res) => {
  const target = req.params.shortUrl
  Url.findOne({ shortUrl: { $regex: `${target}` } })
    .lean()
    .exec()
    .then((url) => {
      res.redirect(url.originUrl)
    })
})

router.post('/', (req, res) => {
  if (req.body.url.includes(req.hostname)) {
    return res.render('index', {
      message: '該網址不能縮短！',
      url: req.body.url
    })
  }
  if (req.body.url.length === 0) {
    return res.render('index', { message: '請輸入網址' })
  }

  Url.findOne({ originUrl: req.body.url })
    .lean()
    .exec()
    .then(async (url) => {
      if (url) {
        return res.render('index', { existingUrl: url.shortUrl })
      } else {
        const value = await getRandomWords(5)
        const port = process.env.NODE_ENV === 'production' ? '' : ':3000'
        const url = new Url({
          originUrl: req.body.url,
          shortUrl:
            req.protocol + '://' + req.hostname + `${port}` + '/' + `${value}`
        })
        url.save().then(() => {
          return res.render('index', { newUrl: url.shortUrl })
        })
      }
    })
})

module.exports = router
