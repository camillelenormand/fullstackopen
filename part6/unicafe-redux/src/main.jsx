import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'

import reducer from './reducer/reducer'

const store = createStore(reducer)

const App = () => {
  return (
    <div>
      <div> 
        <button onClick={e => store.dispatch({ type: 'GOOD'})}> Good </button> 
      </div>

      <div> 
      <button onClick={e => store.dispatch({ type: 'OK'})}> OK </button> 
      </div> 

      <div>
      <button onClick={e => store.dispatch({ type: 'BAD'})}> Bad</button>
      </div> 

      <div>
      <button onClick={e => store.dispatch({ type: 'ZERO'})}> Reset stats</button>
      </div>
      
      <div> 
        Good {store.getState().good}
        </div>
      <div> 
        OK {store.getState().ok}
        </div>
      <div> 
        Bad {store.getState().bad}
        </div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
