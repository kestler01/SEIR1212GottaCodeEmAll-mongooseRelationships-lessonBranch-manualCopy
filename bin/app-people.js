'use strict'

const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/mongoose-crud')
const db = mongoose.connection

const Person = require('../models/person.js')

const done = function () {
  db.close()
}

const create = function (givenName, surname, dob, gender, height, weight) {
  /* Add Code Here */
}

const index = function () {
  /* Add Code Here */
}

const show = function (id) {
  /* Add Code Here */
}

const update = function (id, field, value) {
  /* Add Code Here */
}

const destroy = function (id) {
  /* Add Code Here */
}

db.once('open', function () {
  const command = process.argv[2]

  let field
  let id

  switch (command) {
    case 'create':
      const givenName = process.argv[3]
      const surname = process.argv[4]
      const dob = process.argv[5]
      const gender = process.argv[6]
      const height = process.argv[7]
      const weight = process.argv[8]
      if (true || givenName) {
        create(givenName, surname, dob, gender, height, weight)
      } else {
        console.log('usage c <given_name> <surname> <date of birth> [gender], <height>, <weight>')
        done()
      }
      break

    case `show`:
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