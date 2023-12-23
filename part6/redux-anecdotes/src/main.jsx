import ReactDOM from 'react-dom/client'
import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from '@redux-devtools/extension';
import { Provider } from 'react-redux'
import App from './App'

// Import reducers
import anecdoteReducer from './reducers/anecdoteReducer'
import anecdoteFilterReducer from './reducers/anecdoteFilterReducer'

// Import actions
import { filterChange } from './reducers/anecdoteFilterReducer'

// Combine reducers

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  filter: anecdoteFilterReducer
})

const store = createStore(reducer, composeWithDevTools())

store.subscribe(() => console.log(store.getState()))
store.dispatch(filterChange(''))

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)