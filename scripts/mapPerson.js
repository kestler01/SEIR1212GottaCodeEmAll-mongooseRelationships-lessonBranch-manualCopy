'use strict'

const mapPerson = function (h) {
  const newPerson = {
    name: {}
  }
  Object.keys(h).forEach(function () {
    newPerson.name.given = h.given_name
    newPerson.name.surname = h.surname
    newPerson.dob = h.dob
    newPerson.gender = h.gender
    newPerson.height = h.height
    newPerson.weight = h.weight
  })
  return newPerson
}

module.exports = mapPerson
