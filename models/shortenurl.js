const mongoose = require('mongoose')
const Schema = mongoose.Schema

const urlSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  newUrl: {
    type: String
  }
})

module.exports = mongoose.model('Url', urlSchema)
