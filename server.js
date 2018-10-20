'use strict'

// import the app
const app = require('./app')

// file configuration to run DB
const config = require('./config/keys').get(process.env.NODE_ENV)

// Connecting to DB
const mongoose = require('mongoose')
app.set('port', process.env.PORT || 5000)
mongoose.Promise = global.Promise
mongoose.set('useCreateIndex', true)
mongoose.connect(
  config.DATABASE,
  { useNewUrlParser: true },
)

// triggering the app
mongoose.connection
  .once('open', () => {
    // making the app listening to port
    app.listen(app.get('port'), () => {
      console.log(`Server started on port ${app.get('port')}`)
    })
  })
  .on('error', error => {
    // in case of error
    return console.warn(`Error connecting to the data base: ${error}`)
  })
