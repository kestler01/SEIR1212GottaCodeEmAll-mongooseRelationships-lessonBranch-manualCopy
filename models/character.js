'use strict'

// requiring the mongoose library
const mongoose = require('../db/connection')

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
		isJedi: Boolean,
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
	return nameStr
})

const Character = mongoose.model('Character', characterSchema)

module.exports = Character
