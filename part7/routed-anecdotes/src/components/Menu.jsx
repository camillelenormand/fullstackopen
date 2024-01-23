import { Link, Routes, Route } from 'react-router-dom'
import AnecdoteList from './AnecdoteList'
import CreateNew from './CreateNew'
import About from './About'
import { useState } from 'react'
import data from '../data'
import NotFound from './NotFound'
import Anecdote from './Anecdote'


const Menu = () => {

  const [anecdotes, setAnecdotes] = useState(data)


const addNew = (anecdote) => {
  anecdote.id = Math.round(Math.random() * 10000)
  setAnecdotes(anecdotes.concat(anecdote))
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
      <nav>
        <Link to='/'>Anecdotes</Link>
        <Link to='/new'>New Anecdote</Link>
        <Link to='/about'>About</Link>
      </nav>
      <Routes>
        <Route path="/anecdotes/:id" element={<Anecdote anecdotes={anecdotes} />} />
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />}></Route>
        <Route path='/new' element={<CreateNew addNew={addNew} />}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route pth='*' element={<NotFound/>}></Route>
      </Routes>
    </>
  )
}

export default Menu