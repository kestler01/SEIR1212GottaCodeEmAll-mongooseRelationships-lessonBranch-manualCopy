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

const index = function () {
  /* Add Code Here */
}

const show = function (id) {
  /* Add Code Here */
}

const destroy = function (id) {
  /* Add Code Here */
}

const update = function (id, field, value) {
  /* Add Code Here */
}

const create = function (firstName, lastName, dob, height, weight) {
  /* Add Code Here */
}

db.once('open', function () {
  const command = process.argv[2]

  let field
  let id

  switch (command) {
    case 'create':
      const firstName = process.argv[3]
      const lastName = process.argv[4]
      const dob = process.argv[5]
      const height = process.argv[6]
      const weight = process.argv[7]

      create(firstName, lastName, dob, height, weight)

      break

    case 'show':
      id = process.argv[3]
      show(id)
      break

    case 'update':
      id = process.argv[3]
      field = process.argv[4]
      const value = process.argv[5]
      update(id, field, value)
      break

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
