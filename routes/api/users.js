'use strict'

const express = require('express')
const users = express.Router()

users.get('/test', (req, res) => res.send('hello, this is users API'))

module.exports = users
