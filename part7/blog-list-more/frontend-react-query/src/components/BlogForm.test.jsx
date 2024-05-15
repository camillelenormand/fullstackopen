import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'
import BlogForm from './BlogForm'
import useCreateBlog from '../hooks/useCreateBlog'
import { NotificationContextProvider } from '../contexts/NotificationContext'

// Mock the hooks and context
vi.mock('../hooks/useCreateBlog')
vi.mock('../contexts/AuthContext')

const mockCreateBlog = vi.fn()
useCreateBlog.mockReturnValue({
  mutate: mockCreateBlog,
})

const mockNotify = vi.fn()
vi.mock('../contexts/NotificationContext', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useNotify: () => mockNotify,
  }
})

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

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

test('renders BlogForm and handles submission', async () => {
  renderWithProviders(<BlogForm />)

  // Fill out the form
  fireEvent.change(screen.getByPlaceholderText(/Enter a title/i), { target: { value: 'Test Blog' } })
  fireEvent.change(screen.getByPlaceholderText(/Enter an author/i), { target: { value: 'Test Author' } })
  fireEvent.change(screen.getByPlaceholderText(/Enter a URL/i), { target: { value: 'http://test.url' } })

  // Submit the form
  fireEvent.click(screen.getByText(/Create/i))

  // Mock the mutation onSuccess callback
  const onSuccessCallback = mockCreateBlog.mock.calls[0][1].onSuccess
  onSuccessCallback({ title: 'Test Blog', author: 'Test Author' })

  await waitFor(() => {
    console.log('mockCreateBlog calls:', mockCreateBlog.mock.calls)
    console.log('mockNotify calls:', mockNotify.mock.calls)

    expect(mockCreateBlog).toHaveBeenCalledWith(
      {
        title: 'Test Blog',
        author: 'Test Author',
        url: 'http://test.url'
      },
      expect.anything()
    )

    // Check for success notification
    expect(mockNotify).toHaveBeenCalledWith('Blog created successfully: Test Blog by Test Author', 'success')

    // Check if navigation to home page is triggered
    expect(mockNavigate).toHaveBeenCalledWith('/')
  })
})

test('shows error notification on failure', async () => {
  mockCreateBlog.mockImplementation((_, { onError }) => {
    onError({ message: 'Network error' })
  })

  renderWithProviders(<BlogForm />)

  // Fill out the form
  fireEvent.change(screen.getByPlaceholderText(/Enter a title/i), { target: { value: 'Test Blog' } })
  fireEvent.change(screen.getByPlaceholderText(/Enter an author/i), { target: { value: 'Test Author' } })
  fireEvent.change(screen.getByPlaceholderText(/Enter a URL/i), { target: { value: 'http://test.url' } })

  // Submit the form
  fireEvent.click(screen.getByText(/Create/i))

  await waitFor(() => {
    console.log('mockNotify calls (error):', mockNotify.mock.calls)
    // Check for error notification
    expect(mockNotify).toHaveBeenCalledWith('Failed to create blog: Network error', 'error')
  })
})
