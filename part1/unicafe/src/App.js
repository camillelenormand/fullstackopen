import { useState } from 'react'

const Statistics = (props) => {
  return (
    (props.all === 0) ? <p>No feedback yet</p> : (ste
    <div>
      <h2>statistics</h2>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
      <p>all {props.all}</p>
      <p>positive {props.positive}</p>
      <p>average positive {props.avg} % </p>
    </div>
  ))
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const positive = good / (good + neutral + bad) 
  const all = (good + neutral + bad)
  const avg = (good - bad) / (good + neutral + bad) * 100

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>  
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} positive={positive} avg={avg} />
    </div>
  )
}

export default App