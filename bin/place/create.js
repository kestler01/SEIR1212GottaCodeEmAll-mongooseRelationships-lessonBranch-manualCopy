'use strict'

// instantiate mongodb and mongoose
const mongoose = require('mongoose')
// telling mongoose to use node's promise
mongoose.Promise = global.Promise
// connecting mongoose to mongodb
mongoose.connect('mongodb://localhost/mongoose-relationships', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
// connect the db
const db = mongoose.connection

// require Place model
const Place = require('./../../models/place')

// get input from command line
// node bin/place/create.js Boston 42 -71 "United States"
const nameUserInput = process.argv[2]
const latitudeUserInput = process.argv[3]
const longitudeUserInput = process.argv[4]
const countryUserInput = process.argv[5]

// open connection to db
db.once('open', function () {
  // save place to mongodb
  Place.create({
    name: nameUserInput,
    latitude: latitudeUserInput,
    longitude: longitudeUserInput,
    country: countryUserInput
  })
    // printing success or failure
    .then(console.log)
    .catch(console.error)
    // close connection to db
    .finally(() => db.close())
})
