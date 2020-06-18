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

// open connection to db
db.once('open', function () {
  // find all person documents in mongodb
  Person.find()
    // printing success or failure
    .then((people) => {
      // loop through each person document
      people.forEach(person => {
        // turning it to json
        console.log(person.toJSON())
      })
    })
    .catch(console.error)
    // close connection to db
    .finally(() => db.close())
})
