import { Link, Routes, Route } from 'react-router-dom'
import AnecdoteList from './AnecdoteList'
import CreateNew from './CreateNew'
import About from './About'
import { useState } from 'react'
import data from '../data'


const Menu = () => {

  const [anecdotes, setAnecdotes] = useState(data)


const addNew = (anecdote) => {
  anecdote.id = Math.round(Math.random() * 10000)
  setAnecdotes(anecdotes.concat(anecdote))
}

  const padding = {
    paddingRight: 5
  }

  const [notification, setNotification] = useState('')


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
    <>
      <div>
        <Link style={padding} to='/'> Anecdotes </Link>
        <Link style={padding} to='/new'> Create New </Link>
        <Link style={padding} to='/about'> About </Link>
      </div>
      <Routes>
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />}></Route>
        <Route path='/new' element={<CreateNew addNew={addNew} />}></Route>
        <Route path='/about' element={<About/>}></Route>
      </Routes>
    </>
  )
}

export default Menu