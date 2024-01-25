import Menu from "./components/Menu"
import Footer from "./components/Footer"
import Notification from "./components/Notification"
import { useState } from "react"
import data from "./data"

const App = () => {
  const [anecdotes, setAnecdotes] = useState(data)
  const [notification, setNotification] = useState('')


const addNew = (anecdote) => {
  anecdote.id = Math.round(Math.random() * 10000)
  setAnecdotes(anecdotes.concat(anecdote))
  setNotification('New anecdote has been created !')

  setTimeout(() => {
    setNotification(null)
  }, 5000)
}


  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <header>
      <h1>Software anecdotes</h1>
      <Notification message={notification} />
      <Menu addNew={addNew} anecdotes={anecdotes}/>
      </header>
      <hr />
      <Footer />
    </div>
  )
}

export default App
