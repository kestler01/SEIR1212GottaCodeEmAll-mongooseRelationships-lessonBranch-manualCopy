'use strict'

const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/mongoose-crud', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const db = mongoose.connection

const done = function () { // eslint-disable-line no-unused-vars
  db.close()
}

// CRUD Actions

// node bin/app-places.js create Boston 42.3 71.0 'United States'
const create = function (name, latitude, longitude, country) {
  /* Add Code Here */
}

// node bin/app-places.js
// OR
// node bin/app-places.js index
const index = function () {
  /* Add Code Here */
}

// node bin/app-places.js show 5d2b272ca6d0b658d2c9eb3e
const show = function (id) {
  /* Add Code Here */
}

// node bin/app-places.js update 5d2b272ca6d0b658d2c9eb3e name Boston
const update = function (id, field, value) {
  /* Add Code Here */
}

// node bin/app-places.js destroy 5d2b272ca6d0b658d2c9eb3e
const destroy = function (id) {
  /* Add Code Here */
}

// UI
db.once('open', function () {
  const command = process.argv[2]

  let field
  let id

  switch (command) {
    case 'create': {
      const name = process.argv[3]
      const latitude = process.argv[4]
      const longitude = process.argv[5]
      const country = process.argv[6]

      create(name, latitude, longitude, country)

      break
    }
    case 'show':
      id = process.argv[3]
      show(id)
      break

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
