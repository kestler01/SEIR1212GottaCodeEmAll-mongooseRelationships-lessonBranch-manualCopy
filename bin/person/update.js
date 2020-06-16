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

// require Person model
const Person = require('./../../models/person')

// get input from command line
// node bin/person/show.js 123423432 'firstName' 'Bob'
const userInputId = process.argv[2]
const userInputKey = process.argv[3]
const userInputValue = process.argv[4]

// open connection to db
db.once('open', function () {

  // save person to mongodb
  Person.findById(userInputId)
    // printing success or failure
    .then(person => {

        person[userInputKey] = userInputValue

        return person.save()
    })
    .then(person => {
      console.log(person.toJSON())
    })
    .catch(console.error)
    // close connection to db
    .finally(()=> db.close())
})
