'use strict'

const express = require('express')
const users = express.Router()
const userCtrl = require('../../controllers/Users')

// Register new user
users.post('/register', userCtrl.registerUser)

module.exports = users
