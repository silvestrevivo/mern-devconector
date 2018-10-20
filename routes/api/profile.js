'use strict'

const express = require('express')
const profile = express.Router()

profile.get('/test', (req, res) => res.send('hello, this is profile API'))

module.exports = profile
