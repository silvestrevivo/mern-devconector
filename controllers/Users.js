'use strict'

const { User, validateUser } = require('../models/User')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const SALT_I = 10

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

module.exports = {
  registerUser,
}
