// require express framework in this project
const express = require('express')
const app = express()

// require middleware
const { engine } = require('express-handlebars')
const bodyParser = require('body-parser')

// require internal files
require('./config/mongoose')
const Url = require('./models/shortenUrl')
const getFiveRandomWords = require('./models/getFiveRandomWords')

// view engine setting
app.engine('.hbs', engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')

// go through here first
app.use(bodyParser.urlencoded({ extended: true }))

// router setting
app.get('/', (req, res) => res.render('index'))

app.get('/brand/:id', (req, res) => {
  const id = req.params.id
  Url.find({ newUrl: { $regex: `${id}` } })
    .lean()
    .exec()
    .then((url) => {
      res.redirect(url[0].url)
    })
})

app.post('/', (req, res) => {
  const inputUrl = req.body
  Url.find()
    .lean()
    .then((urls) => {
      if (urls.some((url) => url.url === inputUrl.url)) {
        const targetUrl = urls.find((url) => url.url === inputUrl.url)
        return res.render('index', { targetUrl: targetUrl.newUrl })
      } else {
        const randomWords = getFiveRandomWords()
        const url = new Url({
          url: inputUrl.url,
          newUrl: `https://brand/${randomWords}`
        })
        url.save().then(() => {
          return res.render('index', { url: url.newUrl })
        })
      }
    })
    .catch((_error) => console.log('error'))
})

// start sever and listen
app.listen(3000, () =>
  console.log('Express is working on http://localhost:3000')
)
