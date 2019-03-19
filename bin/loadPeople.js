'use strict'

const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/mongoose-crud', {
  useMongoClient: true
})
const db = mongoose.connection

const Person = require('../models/person')

const fs = require('fs')

const done = function () {
  db.close()
}

const loadPeople = () =>
  new Promise((resolve, reject) => {
    const parse = require('csv').parse

    const input = fs.readFileSync('./data/people.csv', 'utf8')

    parse(input, { columns: true }, (err, output) => {
      if (err) reject(err)

      resolve(output.map(person => ({
        name: { firstName: person.first_name, lastName: person.last_name },
        height: person.height,
        weight: person.weight,
        dob: person.dob
      })))
    })
  })

db.once('open', function () {
  // if the Person model file is empty or malformed, tell the user so
  if (!Person.insertMany) {
    console.log('You must create and export a person model before running this script.')
    return done()
  }

  loadPeople()
    // Below is the way to insert that bypasses mongoose validations
    // .then((people) => {
    //   Person.collection.insert(people)
    // })
    // This inserts and runs the documents through mongoose validations
    .then(Person.insertMany)
    .then(docs => console.log(docs.length + ' documents inserted'))
    .then(done)
    .catch(console.log)
})
