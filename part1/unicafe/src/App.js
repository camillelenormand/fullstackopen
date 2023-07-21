import React from 'react'
import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const Statistics = (props) => {
  return (
    (props.all === 0) ? <p>No feedback yet</p> : (
    <div>
      <table>
        <tbody>
          <tr>
            <StatisticLine text="good" />
            <StatisticLine value={props.good} />
          </tr>
          <tr>
            <StatisticLine text="neutral" />
            <StatisticLine value ={props.neutral} />
          </tr>
          <tr>
            <StatisticLine text="bad"/>
            <StatisticLine value ={props.bad} />
          </tr>
          <tr>
            <StatisticLine text="all" />
            <StatisticLine value ={props.all} />
          </tr>
          <tr>
            <StatisticLine text="positive"/>
            <StatisticLine value ={props.positive} />
          </tr>
          <tr>
            <StatisticLine text="average positive"/>
            <StatisticLine value ={props.avg} />%
          </tr>
        </tbody>
      </table>
    </div>
  ))
}

const StatisticLine = (props) => {
  return (
    <td> {props.text} {props.value}</td>
  )
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
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} positive={positive} avg={avg} />
    </div>
  )
}

export default App