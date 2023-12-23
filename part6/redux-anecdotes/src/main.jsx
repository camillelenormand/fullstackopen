import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import './App.css'

// Import actions
import { filterChange } from './reducers/anecdoteFilterReducer'

// Import store
import store from './store';

store.subscribe(() => console.log(store.getState()))
store.dispatch(filterChange(''))

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)