import { useEffect, useState } from 'react'
import Search from './components/search.js'
import PersonForm from './components/PersonForm.js'
import Persons from './components/persons.js'
import personService from './services/persons'
import Notification from './components/notification.js'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [query, setQuery] = useState('')
  const [message, setMessage] = useState(null)
  const [errMessage, setErrMessage] = useState(null)

  useEffect(()=> {
    console.log('effect')
    personService
      .getAll()
      .then(personData => {
        setPersons(personData)
      })
  }, [])

  const isDuplicate = persons.some(person => {
    if (JSON.stringify(person.name) === JSON.stringify(newName)) {
      return true
    }
    return false
  })

const addDetails = (event) => {
  event.preventDefault()
  const nameObject = {
    name: newName,
    number: newNumber
  }
  if (isDuplicate) {
    alert(`${newName} is already added to the phonebook`)
  }

  else {
    personService
      .create(nameObject)
      .then(personData => {
        setPersons(persons.concat(personData))
        setNewName('')
        setNewNumber('')
        setMessage(`${nameObject.name} is successfully added into phonebook!`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch(error => {
        console.log(error.response.data.error)
        setErrMessage(error.response.data.error)
        setTimeout(() => {
          setErrMessage(null)
        }, 5000)
      })
    }
  }

const handleSearchPerson = (event) => {
  console.log(event.target.value)
  setQuery(event.target.value)

}

const handleNameChange = (event) => {
  console.log(event.target.value)
  setNewName(event.target.value)
}

const handleNumberChange = (event) => {
  console.log(event.target.value)
  setNewNumber(event.target.value)
}

const removePerson = (id) => {
  const selectedPerson = persons.filter(person => person.id === id)
  const selectedName = selectedPerson[0].name
  const selectedID = selectedPerson[0].id
  if (window.confirm(`Delete ${selectedName}?`))
  {
    personService
    .remove(selectedID)
    setPersons(persons.filter(person => person.id !== selectedID))
    setMessage(`${selectedName} has been deleted!`)
  }
}

console.log(query)


return (
  <div>
    <Notification message={message} errMessage={errMessage} />
    <h2>Phonebook</h2>
    <Search onChange={handleSearchPerson} persons={persons} query={query} />
    <h3>Add a new person</h3>
    <PersonForm onSubmit={addDetails} onChangeName={handleNameChange}
    valueName={newName} valueNumber={newNumber} onChangeNumber={handleNumberChange} />
    <h3>Numbers</h3>
    <Persons persons={persons} removePerson={removePerson} />
  </div>
)
}

export default App