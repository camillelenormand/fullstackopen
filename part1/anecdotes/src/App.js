import React from 'react'
import { useState } from 'react'

// Button component
const Button = ({label, handleClick}) => {
  return (
    <button onClick={handleClick}>
      {label}
    </button>
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
   
  // State hooks
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [latestUnvote, setLatestUnvote] = useState(null)


  // Helper functions to select random anecdote
  const pickRandom = () => {
    while (true) {
    
      const newValue = Math.floor(Math.random() * anecdotes.length);
      if (newValue !== selected) return newValue
    }
  }

  // Helper functions to set votes
  const setVote = () => {
    const updatedVotes = [...votes]
    updatedVotes[selected] += 1 
    console.log( 'Updated Votes Array ', updatedVotes);
    setVotes(updatedVotes);
    setLatestUnvote(null);
  }


  // Helper functions to set unvoting
  const setUnvote = () => {
    const updatedVotes = [...votes]
    updatedVotes[selected] -= 1
    if (updatedVotes[selected] < 0) updatedVotes[selected] = 0
    setVotes(updatedVotes);
    console.log(updatedVotes);
    setLatestUnvote(selected);
    console.log(latestUnvote);
  }

  // Helper functions to sort anecdotes
  const sortedIndices = [...anecdotes.keys()].sort((a, b) => votes[b] - votes[a]);

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>
        has {votes[selected]} votes{' '}
        {votes[selected] > 0 && (latestUnvote === selected ? '⬇️' : '⬆️')}
      </p>     
      <br />
      <Button label="Vote" handleClick={() => setVote()} />
      <Button label="Unvote" handleClick={() => setUnvote()} />
      <Button label="Next anecdote" handleClick={() => setSelected(pickRandom())} />
      <br />
      <h1>Anecdote with most votes</h1>
      <table>
        <thead>
          <tr>
            <th>Anecdote</th>
            <th>Votes</th>
          </tr>
        </thead>
        <tbody>
          {sortedIndices.map((index) => (
            <tr key={index}>
              <td>{anecdotes[index]}</td>
              <td>{votes[index]} votes</td>
              <td>
                {index === 0 && <span>⬆️</span>}
                {index !== 0 && votes[index] > votes[index - 1] && <span>⬆️</span>}
                {index !== 0 && votes[index] === votes[index - 1] && <span>⬇️</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App