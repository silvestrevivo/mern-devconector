'use strict'

// This is the middleware to check is a user has a session running
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const moongose = require('mongoose')
const { User } = require('../models/User')
const config = require('../config/keys').get(process.env.NODE_ENV)

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = config.SECRET

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user)
          }
          return done(null, false)
        })
        .catch(err => console.log(err))
      //! I think this has to be catched on another way
    }),
  )
}
