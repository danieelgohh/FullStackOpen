/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://db_danielGoh:${password}@cluster0.ycgx5.mongodb.net/?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

mongoose
  .connect(url)
  .then((result) => {
    console.log('connected')

    if (process.argv.length == 3) {
      Person.find({}).then(result => {
        result.forEach(person => {
          console.log(Person.find({}))
          console.log(person)
        })
        mongoose.connection.close()
      })
    }

    const person = new Person({
      name: process.argv[3],
      number: process.argv[4],
    })

    return person.save()
  })
  .then((result) => {
    console.log(`${result.name}, ${result.number} has been added to the phonebook!`)
    return mongoose.connection.close()
  })
  .catch((err) => console.log(err))