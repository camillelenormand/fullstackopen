import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import './App.css'
import anecdoteService from './services/anecdotes'

// Import actions
import { filterChange } from './reducers/anecdoteFilterReducer'

// Import store
import store from './store';
import { setAnecdotes } from './reducers/anecdoteReducer'

store.subscribe(() => console.log(store.getState()))
store.dispatch(filterChange(''))

anecdoteService.getAll().then(anecdotes => store.dispatch(setAnecdotes(anecdotes)))

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)