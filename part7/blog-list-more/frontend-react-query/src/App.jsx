import './App.css'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import { NotificationContextProvider } from './components/NotificationContextProvider'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

function App() {

  const queryClient = new QueryClient()

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <NotificationContextProvider>
          <div className="App">
            <header className="App-header">
              <h1>Blog List</h1>
              <BlogForm />
              <BlogList />
            </header>
          </div>
        </NotificationContextProvider>
      </QueryClientProvider>

    </>
  )
}

export default App
