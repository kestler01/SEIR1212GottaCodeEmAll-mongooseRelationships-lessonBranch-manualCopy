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
	// save starship to mongodb
	Starship.findById(userInputId)
		.populate('owner')
		// printing success or failure
		.then((starship) => {
			// update the starship object with the passed in key and value
			starship.owner = null

			// then save the starship document in the database
			return starship.save()
		})
		.then((starship) => {
			console.log(starship.toJSON())
		})
		.catch(console.error)
		// close connection to db
		.finally(() => db.close())
})
