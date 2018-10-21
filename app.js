'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const users = require('./routes/api/users')
const posts = require('./routes/api/posts')
const profile = require('./routes/api/profile')

// we run the app
const app = express()

// middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Passport middleware
app.use(passport.initialize())

// Passport strategy - config
require('./config/passport')(passport)

// calling api routers to use end points
app.use('/api/users', users)
app.use('/api/posts', posts)
app.use('/api/profile', profile)

module.exports = app
