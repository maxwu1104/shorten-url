// require express framework in this project
const express = require('express')
const app = express()

// test server
app.get('/', (req, res) => res.send('Hello World!'))

// start sever and listen
app.listen(3000, () =>
  console.log('Express is working on http://localhost:3000')
)
