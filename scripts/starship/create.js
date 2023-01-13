'use strict'

// instantiate mongodb and mongoose
const mongoose = require('./../../db/connection')

// connect the db
const db = mongoose.connection

// require Starship model
const Starship = require('./../../models/starship.js')

// get input from command line

const nameUserInput = process.argv[2] // string
const modelUserInput = process.argv[3] // string
const shieldsUserInput = process.argv[4] // bool

// open connection to db
db.once('open', function () {
	// save starship to mongodb
	Starship.create({
		name: nameUserInput,
		model: modelUserInput,
		shields: shieldsUserInput,
	})
		// printing success or failure
		.then(console.log)
		.catch(console.error)
		// close connection to db
		.finally(() => db.close())
})

// Keeping with the theme I have provided some star ships ready to go

// THE Falcon
// node ./scripts/starship/create.js "Millennium Falcon" "YT-1300" true

// THE X-wing
// node ./scripts/starship/create.js "Red-5" "T-65B" true

// Darth Vader's Tie Fighter
// node ./scripts/starship/create.js "Vader's Custom Tie" "Tie Advanced X1" true

// Darth Vader's Flagship
// node ./scripts/starship/create.js "Executor" "Super Star Destroyer" true

// Razor Crest
// node ./scripts/starship/create.js "Razor Crest" "ST-70 M-111" true

// Custom N-1
// node ./scripts/starship/create.js "Peli Special" " Heavily modified N-1 Custom" true
