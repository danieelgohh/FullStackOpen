import React from 'react'

const Search = ({ onChange, query, persons }) => {
    return (
        <div>
        Search <input onChange={onChange} />
        {    
        persons.filter(person => {
          if (query === '') {
            return null;
          }
      
          else if (person.name.toLowerCase().includes(query.toLowerCase())) {
            return person;
          }
          return null
        }).map((person) => (
          <div key={person.id}>
            <p>{person.name} {person.number}</p>
          </div>
        ))
        }
        </div>
    )
}

export default Search