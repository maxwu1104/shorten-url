const express = require('express')
const router = express.Router()
const Url = require('../../models/shortenUrl')

router.get('/brand/:id', (req, res) => {
  const id = req.params.id
  Url.find({ newUrl: { $regex: `${id}` } })
    .lean()
    .exec()
    .then((url) => {
      res.redirect(url[0].url)
    })
})

module.exports = router
