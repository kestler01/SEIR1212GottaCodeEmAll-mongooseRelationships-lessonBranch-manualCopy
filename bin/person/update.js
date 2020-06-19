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
// node bin/person/update.js 123423432 firstName Bob
const userInputId = process.argv[2]
const userInputKey = process.argv[3]
const userInputValue = process.argv[4]

// open connection to db
db.once('open', function () {
// find a specific person in mongodb
  Person.findById(userInputId)
    .then(person => {
      // update the person object with the passed in key and value
      person[userInputKey] = userInputValue

      // then save the person document in the database
      return person.save()
    })
    .then(person => {
      console.log(person.toJSON())
    })
    .catch(console.error)
    // close connection to db
    .finally(() => db.close())
})
