 import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const StatisticLine = (props) => {
  return (
    <table>
      <tr>
        <td>{props.name} {props.value}</td> 
      </tr>
    </table>
  )
}

const Statistic = (props) => {
    if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <div>
      <StatisticLine name="Good" value={props.good} />
      <StatisticLine name="Neutral" value={props.neutral} />
      <StatisticLine name="Bad" value={props.bad} />
      <StatisticLine name="Total" value={props.good + props.neutral + props.bad} />
      <StatisticLine name="Average" value={(props.good - props.bad) / (props.good + props.neutral + props.bad)} />
      <StatisticLine name="Positive" value={(props.good / (props.good + props.neutral + props.bad)) * 100 + '%'} />
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h1>Statistics</h1>
      <Statistic good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App