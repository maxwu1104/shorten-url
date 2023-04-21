const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const brand = require('./modules/brand')

router.use('/', home)
router.use('/brand', brand)

module.exports = router
