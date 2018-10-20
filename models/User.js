'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema for User
const UserSchema = new Schema({
  name: {
    type: String,
    maxlength: 100,
    required: true,
  },
  lastname: {
    type: String,
    maxlength: 100,
    required: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    require: true,
    minlength: 6,
  },
  avatar: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = User = mongoose.model('User', UserSchema)
