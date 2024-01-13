import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () =>
  axios.get(baseUrl).then(res => res.data)

  export const createAnecdote = newAnecdote => {
    // Check if the length of newAnecdote is less than 5
    if (newAnecdote.length < 5) {
      // Handle the error case here, e.g., throw an error or return a rejected promise
      return Promise.reject(new Error('Anecdote is too short, enter at least 5 characters.'))
    }
  
    // If the validation passes, make the Axios POST request
    return axios.post(baseUrl, newAnecdote).then(res => res.data)
  }


export const updateAnecdote = anecdoteUpdated =>
axios.put(`${baseUrl}/${anecdoteUpdated.id}`, anecdoteUpdated).then(res => res.data)