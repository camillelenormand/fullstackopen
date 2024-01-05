import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../requests"
import { useState } from "react"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const [errorMessage, setErrorMessage] = useState('')

  const validateInput = (content) => {
    if (content.length < 5) {
      setErrorMessage('Anecdote content must be at least 5 characters long')
      return false
    }
    setErrorMessage('')
    return true
  }

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      queryClient.setQueryData(['anecdotes'], (oldAnecdotes) => [...oldAnecdotes, newAnecdote]);
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value.trim()

    if (!validateInput(content)) {
      return
    }

    newAnecdoteMutation.mutate({ content, vote: 0 })
    event.target.anecdote.value = ''
  }

  return (
    <div>
      <form onSubmit={onCreate}>
        <input name='anecdote' placeholder="Enter a new anecdote..." disabled={newAnecdoteMutation.isLoading}/>
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        <button type="submit" disabled={newAnecdoteMutation.isLoading}>
          {newAnecdoteMutation.isLoading ? 'Creating...' : 'New'}
        </button>
      </form>
      {newAnecdoteMutation.isLoading && <p>Creating your anecdote...</p>}
    </div>
  )
}

export default AnecdoteForm
