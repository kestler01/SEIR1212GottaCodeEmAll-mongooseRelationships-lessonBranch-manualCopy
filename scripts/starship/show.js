'use strict'

// instantiate mongodb and mongoose
const mongoose = require('./../../db/connection')

// connect the db
const db = mongoose.connection

// require Starship model
const Starship = require('./../../models/starship')

// get input from command line
const userInputId = process.argv[2]

// open connection to db
db.once('open', function () {
  // find a specific starship in mongodb
  Starship.findById(userInputId)
    // printing success or failure
    .then((starship) => {
      // turning it to json
      console.log(starship.toJSON())
    })
    .catch(console.error)
    // close connection to db
    .finally(() => db.close())
})

// node ./scripts/starship/show.js <id>