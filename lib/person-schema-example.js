const mongoose = require('mongoose')

// Create new Mongoose Schema personSchema
const personSchema = new mongoose.Schema({
  name: {
    firstName: String,
    lastName: String
  }
})

// Compile Person model from the personSchema Mongoose Schema
const Person = mongoose.model('Person', personSchema)

// Create a new person document and store it in the variable person
const person = Person.create({ /* ... */ })
// alternatively,
/*
   let person = new Person({...});
   person.save();
   */

// Virtual Attributes
//
personSchema.virtual('name.full').get(function () {
  return this.name.firstName + ' ' + this.name.lastName
})

personSchema.virtual('name.full').set(function (name) {
  const split = name.split(' ')
  this.name.firstName = split[0]
  this.name.lastName = split[1]
})

module.exports = person
