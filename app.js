// require express framework in this project
const express = require('express')
const app = express()

// require middleware
const { engine } = require('express-handlebars')

// view engine setting
app.engine('hbs', engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.set('views', './views')

// test server
app.get('/', (req, res) => res.render('index'))

// start sever and listen
app.listen(3000, () =>
  console.log('Express is working on http://localhost:3000')
)
