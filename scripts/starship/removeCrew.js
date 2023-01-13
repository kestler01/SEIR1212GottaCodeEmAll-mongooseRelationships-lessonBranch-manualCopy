'use strict'

// instantiate mongodb and mongoose
const mongoose = require('./../../db/connection')

// connect the db
const db = mongoose.connection

// require Starship model
const Starship = require('./../../models/starship')

// get input from command line

const userInputIdStarship = process.argv[2]
const userInputIdCharacter = process.argv[3]

// open connection to db
db.once('open', function () {
	// save starship to mongodb
	Starship.findById(userInputIdStarship)
		.populate(['owner','crew'])
		// printing success or failure
		.then((starship) => {
			//removes the target from the database entirely !
            // for(let member of starship.crew){
                
            //     if( member.id == userInputIdCharacter){
            //         member.remove()
            //     }
            // }
            // console.log(starship)
			// then save the starship document in the database
            starship.crew.pull(userInputIdCharacter)
			return starship.save()
		})
		.then((starship) => {
			console.log(starship.toJSON())
		})
		.catch(console.error)
		// close connection to db
		.finally(() => db.close())
})
