import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'
import LoginForm from './LoginForm'
import { NotificationContextProvider, useNotify } from '../contexts/NotificationContext'

// Mock the notify hook
const mockNotify = vi.fn()
vi.mock('../contexts/NotificationContext', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useNotify: () => mockNotify,
  }
})

// Mock the useNavigate hook
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

// Mock the useLogin hook
const mockUseLogin = vi.fn()
vi.mock('../contexts/AuthContext', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useLogin: () => mockUseLogin,
  }
})

// Mock the useField hook
vi.mock('../hooks/useField', () => ({
  useField: (type) => ({
    value: type === 'text' ? 'testuser' : 'testpassword',
    onChange: vi.fn(),
    reset: vi.fn(),
  }),
}))

// Utility function to render the component with necessary providers
const renderWithProviders = (ui) => {
  const queryClient = new QueryClient()
  return render(
    <QueryClientProvider client={queryClient}>
      <NotificationContextProvider>
        <MemoryRouter>
          {ui}
        </MemoryRouter>
      </NotificationContextProvider>
    </QueryClientProvider>
  )
}

beforeEach(() => {
  vi.clearAllMocks()
})

test('renders LoginForm and handles successful login', async () => {
  renderWithProviders(<LoginForm />)

  // Fill out the form
  fireEvent.change(screen.getByPlaceholderText(/username/i), { target: { value: 'testuser' } })
  fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'testpassword' } })

  // Set up the mock to resolve successfully
  mockUseLogin.mockResolvedValue({})

  // Submit the form
  fireEvent.click(screen.getByText(/login/i))

  await waitFor(() => {
    expect(mockUseLogin).toHaveBeenCalledWith({
      username: 'testuser',
      password: 'testpassword',
    })

    // Check for success notification
    expect(mockNotify).toHaveBeenCalledWith('Login successful', 'success')

    // Check if navigation to blogs page is triggered
    expect(mockNavigate).toHaveBeenCalledWith('/blogs')
  })
})

test('shows error notification on failed login', async () => {
  renderWithProviders(<LoginForm />)

  // Fill out the form
  fireEvent.change(screen.getByPlaceholderText(/username/i), { target: { value: 'testuser' } })
  fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'testpassword' } })

  // Set up the mock to reject with an error
  mockUseLogin.mockRejectedValue(new Error('Invalid username or password'))

  // Submit the form
  fireEvent.click(screen.getByText(/login/i))

  await waitFor(() => {
    // Check for error notification
    expect(mockNotify).toHaveBeenCalledWith('Invalid username or password', 'error')
  })
})
