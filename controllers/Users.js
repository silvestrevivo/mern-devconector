'use strict'

const { User, validateUser, validateLoginUser } = require('../models/User')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const SALT_I = 10
const jwt = require('jsonwebtoken')
const config = require('../config/keys').get(process.env.NODE_ENV)

// Register new user
function registerUser(req, res) {
  // Validation of input using Joi to expose in front-end
  const { error } = validateUser(req.body)
  if (error) return res.status(409).json({ validation: error.details[0].message })

  User.findOne({ email: req.body.email }, (err, user) => {
    // Handling errors in the backend
    if (err) return res.status(500).send({ message: `Error in the request: ${err}.` })
    if (user) return res.status(400).json({ message: `Email already exists!` })

    // Success in request
    const avatar = gravatar.url(req.body.email, {
      s: '200', // Size
      r: 'pg', // Rating
      d: 'mm', //Default
    })

    const newUser = new User({
      name: req.body.name,
      lastname: req.body.lastname,
      email: req.body.email,
      avatar,
      password: req.body.password,
    })

    bcrypt.genSalt(SALT_I, (err, salt) => {
      if (err) throw err
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err

        newUser.password = hash // we assing the hash to new password

        newUser.save((err, user) => {
          // sending the success of the registration
          if (err) return res.status(500).json({ success: false, err })
          res.status(200).json({
            success: true,
            user,
          })
        })
      })
    })
  })
}

// Login user
function loginUser(req, res) {
  // Validation of input using Joi to expose in front-end
  const { error } = validateLoginUser(req.body)
  if (error) return res.status(409).json({ validation: error.details[0].message })

  const { email, password } = req.body
  User.findOne({ email }, (err, user) => {
    if (err) return res.status(500).send({ message: `Error in the request: ${err}.` })

    if (!user) return res.status(400).json({ isAuth: false, message: 'Email user not found!' })

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (!isMatch)
        return res.status(400).json({
          isAuth: false,
          message: 'Wrong user password',
        })

      // if the mail is found and the password matchs, a new token is generated
      const payload = { id: user.id, name: user.name, avatar: user.avatar }

      jwt.sign(payload, config.SECRET, { expiresIn: 3600 }, (err, token) => {
        if (err) return res.status(400).send({ message: `token not generated, error: ${err}` })

        res.status(200).json({ isAuth: true, token: `Bearen ${token}` })
      })
    })
  })
}

module.exports = {
  registerUser,
  loginUser,
}
