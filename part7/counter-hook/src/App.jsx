
import './App.css'
import UserForm from './components/userForm'
import useCounter from './hooks/useCounter'

function App() {
  const counter = useCounter()

  return (
    <>
      <p>{counter.value}</p>
      <button onClick={counter.increase}>
        plus
      </button>
      <button onClick={counter.decrease}>
        minus
      </button>      
      <button onClick={counter.zero}>
        zero
      </button>
      <UserForm />
    </>
  )
}

export default App
