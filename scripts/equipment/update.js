'use strict'

const mongoose = require('../../db/connection')

const db = mongoose.connection

const Character = require('../../models/character')

// the character Id
const userInputId = process.argv[2]
// the equipment of the character i want to get - ID
const userInputEquipmentId = process.argv[3]
// open connection to db
const userInputUpdateKey = process.argv[4]

const userInputUpdateValue = process.argv[5]

db.once('open', function () {
	// find a specific character in mongodb
	Character.findById(userInputId)
		.then((character) => {
			let item = character.equipment.id(userInputEquipmentId)
            item[userInputUpdateKey] = userInputUpdateValue
            return character.save()
		})
		// printing success or failure
		.then((character) => {
			// turning it to json
			console.log(character.toJSON())
		})
		.catch(console.error)
		// close connection to db
		.finally(() => db.close())
})
