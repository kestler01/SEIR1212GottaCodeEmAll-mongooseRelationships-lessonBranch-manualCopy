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
// node bin/person/create.js Fred Jones 1998-03-08 62 240
const firstNameUserInput = process.argv[2]
const lastNameUserInput = process.argv[3]
const dobUserInput = process.argv[4]
const heightUserInput = process.argv[5]
const weightUserInput = process.argv[6]

// open connection to db
db.once('open', function () {
  // save person to mongodb
  Person.create({
    firstName: firstNameUserInput,
    lastName: lastNameUserInput,
    dob: dobUserInput,
    height: heightUserInput,
    weight: weightUserInput
  })
    // printing success or failure
    .then(console.log)
    .catch(console.error)
    // close connection to db
    .finally(() => db.close())
})
