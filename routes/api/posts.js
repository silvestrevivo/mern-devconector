'use strict'

const express = require('express')
const posts = express.Router()

posts.get('/test', (req, res) => res.send('hello, this is posts API'))

module.exports = posts
