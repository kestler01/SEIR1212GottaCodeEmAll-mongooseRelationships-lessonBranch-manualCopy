'use strict'

const mapPerson = function (record) {
  const newPerson = {
    name: {}
  }
  Object.keys(record).forEach(function () {
    newPerson.name.given = record.given_name
    newPerson.name.surname = record.surname
    newPerson.dob = record.dob
    newPerson.gender = record.gender
    newPerson.height = record.height
    newPerson.weight = record.weight
  })
  return newPerson
}

module.exports = mapPerson
