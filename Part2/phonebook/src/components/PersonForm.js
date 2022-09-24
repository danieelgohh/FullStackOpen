import React from 'react'

const PersonForm = ({ onSubmit, onChangeName, valueName, valueNumber, onChangeNumber }) => {
    return (
        <form onSubmit={onSubmit}>
            <div>Name: <input value={valueName} onChange={onChangeName}/></div>
            <div>Number: <input value={valueNumber} onChange={onChangeNumber}/></div>
            <button type="submit">Add</button>
        </form>
    )
}

export default PersonForm