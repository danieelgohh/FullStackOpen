import React from 'react'

const Persons = ({ persons, removePerson }) => {
    return (
        <div>
            {persons.map(person => <div key={person.name}>{person.name} {person.number} <button onClick={() => removePerson(person.id)}>Delete</button></div>)}
        </div>
    )
}

export default Persons