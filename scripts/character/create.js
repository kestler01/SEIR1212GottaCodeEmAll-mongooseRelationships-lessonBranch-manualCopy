// require connected mongoose
const mongoose = require('../../db/connection')

// connect the db
const db = mongoose.connection

// require Character model
const Character = require('../../models/character')

// get input from command line
// node bin/person/create.js Fred Jones 1998-03-08 62 240
const firstNameUserInput = process.argv[2]
const lastNameUserInput = process.argv[3]
const isJediUserInput = process.argv[4]

// open connection to db
db.once('open', function () {
	// save person to mongodb
	Character.create({
		firstName: firstNameUserInput,
		lastName: lastNameUserInput,
		isJedi: isJediUserInput,
	})
		// printing success or failure
		.then(console.log)
		.catch(console.error)
		// close connection to db
		.finally(() => db.close())
})
// node ./scripts/character/create.js Luke Skywalker true
