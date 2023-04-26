// require express framework in this project
const express = require('express')
const app = express()

// require middleware
const { engine } = require('express-handlebars')
const bodyParser = require('body-parser')

// require internal files
require('./config/mongoose')
const routes = require('./routes/index')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// view engine setting
app.engine('.hbs', engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')

// go through here first
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

// router setting
app.use(routes)

// start sever and listen
const PORT = process.env.PORT
app.listen(PORT, () =>
  console.log('Express is working on http://localhost:3000')
)
