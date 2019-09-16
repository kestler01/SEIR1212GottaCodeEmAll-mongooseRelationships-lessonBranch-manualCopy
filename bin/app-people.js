'use strict'

const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/mongoose-crud', {
  useMongoClient: true
})
const db = mongoose.connection

const Person = require('../models/person.js')

const done = function () { // eslint-disable-line no-unused-vars
  db.close()
}

// node bin/app-people.js
// OR
// node bin/app-people.js index
const index = function () {
  /* Add Code Here */
}

// node bin/app-people.js show 5d2b272ca6d0b658d2c9eb3e
const show = function (id) {
  /* Add Code Here */
}

// node bin/app-people.js destroy 5d2b272ca6d0b658d2c9eb3e
const destroy = function (id) {
  /* Add Code Here */
}

// node bin/app-people.js update 5d2b272ca6d0b658d2c9eb3e height 62
const update = function (id, field, value) {
  /* Add Code Here */
}

// node bin/app-people.js create Fred Jones '1998-03-08' 62 240
const create = function (firstName, lastName, dob, height, weight) {
  /* Add Code Here */
}

db.once('open', function () {
  const command = process.argv[2]

  let field
  let id

  switch (command) {
    case 'create': {
      const firstName = process.argv[3]
      const lastName = process.argv[4]
      const dob = process.argv[5]
      const height = process.argv[6]
      const weight = process.argv[7]

      create(firstName, lastName, dob, height, weight)

      break
    }
    case 'show': {
      id = process.argv[3]
      show(id)
      break
    }
    case 'update': {
      id = process.argv[3]
      field = process.argv[4]
      const value = process.argv[5]
      update(id, field, value)
      break
    }
    case 'destroy':
      id = process.argv[3]
      destroy(id)
      break

    default:
      index()

      break
  }
})

module.exports = Person
