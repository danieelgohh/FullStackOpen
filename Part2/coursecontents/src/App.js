import { Course, Header, Total } from './index'
const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  // const total = courses.parts.reduce((sum, exercise) => sum + exercise.exercises, 0) 

  return (
    <div>
    {courses.map(content => { 
    return ( [
    <Header key={content.id} courses={content} />,
    content.parts.map(part => <Course key={part.id} courses={part} />),
    <Total total={content.parts.reduce((sum, exercise) => sum + exercise.exercises, 0)} /> 
    ]) 
    })
    }
    </div>
  )
}

export default App