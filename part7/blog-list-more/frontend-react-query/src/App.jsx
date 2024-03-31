import './App.css'
import HomePage from './components/HomePage'
import Notification from './components/Notification'

function App() {

    return (
      <div className="App">
        <header className="App-header">
          <h1>My Blog</h1>
          <Notification />
        </header>
        <HomePage />
      </div>
    )
  }

export default App
