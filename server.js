'use strict'

const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.get('/', (req, res) => res.send('hello'))
app.set('port', process.env.PORT || 5000)

// DB config
const db = require('./config/keys').mongoURI
mongoose.Promise = global.Promise
mongoose.set('useCreateIndex', true)
mongoose.connect(
  db,
  { useNewUrlParser: true },
)

mongoose.connection
  .once('open', () => {
    // making the app listening to port
    app.listen(app.get('port'), () => {
      console.log(`Server started on port ${app.get('port')}`)
    })
  })
  .on('error', error => {
    return console.warn(`Error connecting to the data base: ${error}`)
  })
