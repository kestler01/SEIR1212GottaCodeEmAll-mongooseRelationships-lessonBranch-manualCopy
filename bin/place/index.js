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

// open connection to db
db.once('open', function () {
  // find all person documents in mongodb
  Place.find()
    // printing success or failure
    .then(places => {
      // loop through each place document
      places.forEach(place => {
        // turning it to json
        console.log(place.toJSON())
      })
    })
    .catch(console.error)
    // close connection to db
    .finally(() => db.close())
})
