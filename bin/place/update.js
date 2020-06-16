'use strict'

// instantiate mongodb and mongoose
const mongoose = require('mongoose')
// telling mongoose to use node's promise
mongoose.Promise = global.Promise
// connecting mongoose to mongodb
mongoose.connect('mongodb://localhost/mongoose-crud', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
// connect the db
const db = mongoose.connection

// require Place model
const Place = require('./../../models/place')

// get input from command line
// node bin/place/show.js 123423432 'country' 'USA'
const userInputId = process.argv[2]
const userInputKey = process.argv[3]
const userInputValue = process.argv[4]

// open connection to db
db.once('open', function () {

  // save place to mongodb
  Place.findById(userInputId)
    // printing success or failure
    .then(place => {

        place[userInputKey] = userInputValue

        return place.save()
    })
    .then(place => {
      console.log(place.toJSON())
    })
    .catch(console.error)
    // close connection to db
    .finally(()=> db.close())
})
