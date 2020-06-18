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
// node bin/place/show.js 123423432
const userInputId = process.argv[2]

// open connection to db
db.once('open', function () {
  // find a specific place in mongodb
  Place.findById(userInputId)
    // printing success or failure
    .then((place) => {
      // turning it to json
      console.log(place.toJSON())
    })
    .catch(console.error)
    // close connection to db
    .finally(() => db.close())
})
