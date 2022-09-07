import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const Header = ({ courses }) => {
    return (
        <div>
            <h1>{courses.name}</h1>
        </div>
    )
}

const Course = ({ courses }) => {
    return (
        <div>
            {courses.name} {courses.exercises}
        </div>
    )
}

const Total = (props) => {
    return (
        <p>
            Total of {props.total} exercises
        </p>
    )
}

        

// const Total = (props) => {
//   return (
//     <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
//   )
// }
export { Course, Total, Header }

ReactDOM.render(<App />, document.getElementById('root'))