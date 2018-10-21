'use strict'

const express = require('express')
const users = express.Router()
const userCtrl = require('../../controllers/Users')
const passport = require('passport')

// Register new user
users.post('/register', userCtrl.registerUser)

// Login user
users.post('/login', userCtrl.loginUser)

// Protected route
users.get('/current', passport.authenticate('jwt', { session: false }), userCtrl.protectedRouteUser)

module.exports = users
