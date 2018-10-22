'use strict'

const mongoose = require('mongoose')
const Joi = require('joi')

// Create Schema for User
const User = mongoose.model(
  'User',
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
    },
    lastname: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
    },
    email: {
      type: String,
      require: true,
      minlength: 5,
      maxlength: 255,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      minlength: 6,
      maxlength: 1024,
    },
    avatar: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  }),
)

function validateUser(user) {
  // this is validation for the front-end using Joi
  const schema = {
    name: Joi.string()
      .min(3)
      .max(50)
      .required(),
    lastname: Joi.string()
      .min(3)
      .max(50)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required(),
    ['Confirm password']: Joi.string()
      .required()
      .valid(Joi.ref('password'))
      .options({
        language: {
          any: {
            allowOnly: ' does not match!!',
          },
        },
      }),
    avatar: Joi.string(),
  }

  return Joi.validate(user, schema)
}

function validateLoginUser(user) {
  // this is validation for the front-end using Joi
  const schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required(),
  }

  return Joi.validate(user, schema)
}

module.exports = {
  User,
  validateUser,
  validateLoginUser,
}
