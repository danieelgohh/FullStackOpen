require('dotenv').config()
const { response } = require('express')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const Person = require('./models/person')
const app = express()

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('build'))

let phonebook = [
    { 
        id: 1,
        name: "Arto Hellas", 
        number: "040-123456"
    },
    { 
        id: 2,
        name: "Ada Lovelace", 
        number: "39-44-5323523"
    },
    { 
        id: 3,
        name: "Dan Abramov", 
        number: "12-43-234345"
    },
    { 
        id: 4,
        name: "Mary Poppendieck", 
        number: "39-23-6423122"
    }
]

let phonebookLength = phonebook.reduce((totalLength, person) => {
    totalLength = person.id
    return totalLength
}, 0)

app.get('/api/persons', (request, response) => {
    Person.find({}).then(person => {
        response.json(person)
    })

})

app.get('/api/info', (request, response) => {
    response.send(
        `<div>
            <p>Phonebook has info for ${phonebookLength} people</p>
            <p>${Date()}</p>
        </div>`
        )
})

app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id).then(person => {
        res.json(person)
    })
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/persons', (req, res) => {
    const newPerson = req.body

    if (!newPerson.name) {
        return res.status(400).json({
            error: 'Missing name!'
        })
    }

    else if (!newPerson.number) {
        return res.status(400).json({
            error: 'Missing number!'
        })
    }

    if (phonebook.find(persons => persons.name === newPerson.name)) {
        return res.status(400).json({
            error: 'Name must be unique!'
        })
    }

    const person = new Person({
        name: newPerson.name,
        number: newPerson.number,
    })

    person.save().then(savedPerson => {
        res.json(savedPerson)
    })
})

const errorHandler = (error, req, res, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'Malformatted ID!' })
    }
    
    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})