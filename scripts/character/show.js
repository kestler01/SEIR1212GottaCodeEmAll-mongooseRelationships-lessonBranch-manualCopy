'use strict'

// instantiate mongodb and mongoose
const mongoose = require('../../db/connection')

// connect the db
const db = mongoose.connection

// require Character model
const Character = require('../../models/character')

// get input from command line
const userInputId = process.argv[2]

// open connection to db
db.once('open', function () {
	// find a specific character in mongodb
	Character.findById(userInputId)
		// printing success or failure
		.then((character) => {
			// turning it to json
			console.log(character.toJSON())
		})
		.catch(console.error)
		// close connection to db
		.finally(() => db.close())
})

// node ./scripts/character/show.js <id>
