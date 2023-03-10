'use strict'
// const Mongoose = {}.Mongoose
// const { Mongoose } = require('mongoose') // destructuring 
// requiring the mongoose library
const mongoose = require('../db/connection')

const equipmentSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	isBroken: {
		type: Boolean,
		required: true,
		default: false,
	},
	description: {
		type: String,
		required: false,
	},
})

const characterSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		isJedi: {
			type: Boolean,
			required: false,
		},
		equipment: [equipmentSchema],
	},
	{
		timestamps: true,
		toObject: { virtuals: true },
		toJSON: { virtuals: true },
	}
)

characterSchema.virtual('fullName').get(function () {
	let nameStr = this.firstName + ' ' + this.lastName
	if (this?.isJedi) nameStr = 'Jedi ' + nameStr
	// see optional chain operator mdn docs (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)
	return nameStr
})

const Character = mongoose.model('Character', characterSchema)

module.exports = Character

// if i want to drop my current collection of characters open our mongodb shell and run db.character.drop()
