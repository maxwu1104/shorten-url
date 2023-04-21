const express = require('express')
const router = express.Router()
const Url = require('../../models/shortenUrl')
const getFiveRandomWords = require('../../models/getFiveRandomWords')

router.get('/', (req, res) => res.render('index'))

router.post('/', (req, res) => {
  const inputUrl = req.body
  Url.find({ url: inputUrl.url })
    .lean()
    .exec()
    .then(async (url) => {
      if (url.length === 1) {
        return res.render('index', { existingUrl: url[0].newUrl })
      } else {
        const value = await getFiveRandomWords()
        const url = new Url({
          url: inputUrl.url,
          newUrl: `http://localhost:3000/brand/${value}`
        })
        url.save().then(() => {
          return res.render('index', { newUrl: url.newUrl })
        })
      }
    })
})

module.exports = router
