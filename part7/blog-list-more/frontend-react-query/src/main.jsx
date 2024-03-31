import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { QueryClient, QueryClientProvider } from 'react-query'
import { NotificationContextProvider } from './contexts/NotificationContext.jsx'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <NotificationContextProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </NotificationContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
