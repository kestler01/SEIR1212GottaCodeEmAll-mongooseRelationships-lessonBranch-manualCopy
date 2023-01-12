'use strict'

// instantiate mongodb and mongoose
const mongoose = require('../../db/connection')

// connect the db
const db = mongoose.connection

// require Character model
const Character = require('../../models/character')

// get input from command line
const userInputId = process.argv[2]
const userInputKey = process.argv[3]
const userInputValue = process.argv[4]

// open connection to db
db.once('open', function () {
	// find a specific character in mongodb
	Character.findById(userInputId)
		.then((character) => {
			// update the character object with the passed in key and value
			character[userInputKey] = userInputValue

			// then save the character document in the database
			return character.save()
		})
		.then((character) => {
			console.log(character.toJSON())
		})
		.catch(console.error)
		// close connection to db
		.finally(() => db.close())
})

// node ./scripts/update.js <id> <key> <value>