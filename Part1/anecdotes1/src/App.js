import { useState } from 'react'

const Display = (props) => {
  if (props.anecdote === null && props.votes === 0) {
    return (
      null
    )
  }

  else if (props.votes === 0) {
    return (
      <div>
        <p>{props.anecdote}</p>
        <p>No votes yet!</p>
      </div>
    )
  }


  
  else if (props.votes > 0 && props.anecdote != null) {
    return (
      <div>
        <p>{props.anecdote}</p>
        <p>This anecdote has {props.votes} votes</p>
    </div>
    )
  }
  return (
    <p>Generate an anecdote and vote on your favourite!</p>
  )
}

const Button = (props) => (
    <button onClick={props.handleClick}>{props.text}</button>
)

const Top = (props) => {
  if (props.votes === 0) {
    return (
      null
    )
  }

  else if (props.votes === 1) {
    return (
      <div>
        <p>{props.text}</p>
        <p>This anecdote has {props.votes} vote</p>
      </div>
      
    )
  }
  return (
    <div>
      <p>{props.text}</p>
      <p>This anecdote has {props.votes} votes</p>
  </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(null)
  const [points, setPoints] = useState(Array(7).fill(0))
  
  const handleVoteClick = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }
  const copy = [...points]
  console.log(points)
  console.log(...points)
  console.log(anecdotes[selected])
  return (
    <div>
      <Display anecdote={anecdotes[selected]} votes={copy[selected]} />
      <Button handleClick={handleVoteClick} text="Vote" />
      <Button handleClick={() => setSelected(Math.floor(Math.random() * 7))} text="Generate Anecdote" />
      <Top text={anecdotes[points.indexOf(Math.max(...points))]} votes={Math.max(...points)} />
    </div>
  )
}

export default App
