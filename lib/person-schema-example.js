const mongoose = require('mongoose')

// Create new Mongoose Schema personSchema
const personSchema = new mongoose.Schema({
  firstName: String,
  lastName: String
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
personSchema.virtual('fullName').get(function () {
  return this.firstName + ' ' + this.lastName
})

module.exports = person
