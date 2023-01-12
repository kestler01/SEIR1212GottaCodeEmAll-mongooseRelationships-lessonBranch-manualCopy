'use strict'


const mongoose = require('../db/connection')

const starshipSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
})

starshipSchema.virtual('isCrewed').get(function () {
  return (crew.length > 0)
})
starshipSchema.virtual('repair').get(function () {

})

const Starship = mongoose.model('Starship', starshipSchema)

module.exports = Starship
