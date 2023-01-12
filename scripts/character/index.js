'use strict'

// instantiate mongodb and mongoose
const mongoose = require('../../db/connection')

// connect the db
const db = mongoose.connection

// require Character model
const Character = require('../../models/character')

// open connection to db
db.once('open', function () {
	// find all character documents in mongodb
	Character.find()
		// printing success or failure
		.then((people) => {
			// loop through each character document
			people.forEach((character) => {
				// turning it to json
				console.log(character.toJSON())
			})
		})
		.catch(console.error)
		// close connection to db
		.finally(() => db.close())
})

// node ./scripts/character/index.js
