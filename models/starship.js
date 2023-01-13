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
  shields: {
    type: Boolean,
    required: false
  }
}, {
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
})

starshipSchema.virtual('isCrewed').get(function () {
  return (this?.crew?.length > 0)
})
starshipSchema.virtual('isShielded').get(function () {
  let shieldReading = 'The shields are down!'
  if(this?.shields){ shieldReading = 'The shields are up'}
  return (shieldReading )
})

const Starship = mongoose.model('Starship', starshipSchema)

module.exports = Starship


// if i want to drop my current collection of star ships open our mongodb shell and run db.starship.drop()