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

// require Person model
const Person = require('./../../models/person')

// get input from command line
// node bin/person/show.js 123423432
const userInputId = process.argv[2]

// open connection to db
db.once('open', function () {
  // find a specific person in mongodb
  Person.findById(userInputId)
    // printing success or failure
    .then((person) => {
      // turning it to json
      console.log(person.toJSON())
    })
    .catch(console.error)
    // close connection to db
    .finally(() => db.close())
})
