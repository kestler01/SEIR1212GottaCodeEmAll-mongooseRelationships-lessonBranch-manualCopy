'use strict'

const mongoose = require('../../db/connection')

const db = mongoose.connection

const Character = require('../../models/character')

const userInputId = process.argv[2]
const userInputEquipmentId = process.argv[3]
// open connection to db
db.once('open', function () {
	// find a specific character in mongodb
	Character.findById(userInputId)
        .then((character)=>{
            return character.equipment.id(userInputEquipmentId)
        })
		// printing success or failure
		.then((equipment) => {
			// turning it to json
			console.log(equipment.toJSON())
		})
		.catch(console.error)
		// close connection to db
		.finally(() => db.close())
})

