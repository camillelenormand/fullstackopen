import { Link, Routes, Route } from 'react-router-dom'
import AnecdoteList from './AnecdoteList'
import CreateNew from './CreateNew'
import About from './About'
import NotFound from './NotFound'
import Anecdote from './Anecdote'


const Menu = ({ anecdotes, addNew }) => {

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