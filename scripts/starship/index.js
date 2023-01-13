'use strict'

// instantiate mongodb and mongoose
const mongoose = require('./../../db/connection')

// connect the db
const db = mongoose.connection

// require Starship model
const Starship = require('./../../models/starship')

// open connection to db
db.once('open', function () {
  // find all person documents in mongodb
  Starship.find()
    .populate('owner')
    // printing success or failure
    .then(starships => {
      // loop through each starship document
      starships.forEach(starship => {
        // turning it to json
        console.log(starship.toJSON())
      })
    })
    .catch(console.error)
    // close connection to db
    .finally(() => db.close())
})

// node ./scripts/starship/index.js