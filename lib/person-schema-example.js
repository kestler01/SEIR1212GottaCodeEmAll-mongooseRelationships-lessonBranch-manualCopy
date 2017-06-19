const mongoose = require('mongoose')

// Create new Mongoose Schema personCchema
const personSchema = new mongoose.Schema({
  name: {
    given: String,
    surname: String
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
  return this.name.given + ' ' + this.name.surname
})

personSchema.virtual('name.full').set(function (name) {
  const split = name.split(' ')
  this.name.given = split[0]
  this.name.surname = split[1]
})

module.exports = person
