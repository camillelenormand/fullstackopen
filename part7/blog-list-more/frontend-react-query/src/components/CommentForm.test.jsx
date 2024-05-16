import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { vi } from 'vitest'
import CommentForm from './CommentForm'

// Mock the useCreateComment hook
const mockUseCreateComment = vi.fn()
vi.mock('../hooks/useCreateComment', () => ({
  default: (blogId) => ({
    mutate: mockUseCreateComment,
  }),
}))

// Utility function to render the component with necessary providers
const renderWithProviders = (ui) => {
  const queryClient = new QueryClient()
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  )
}

beforeEach(() => {
  vi.clearAllMocks()
})

test('renders CommentForm and handles form submission', async () => {
  const blogId = '1234'
  renderWithProviders(<CommentForm blogId={blogId} />)

  // Fill out the form
  fireEvent.change(screen.getByPlaceholderText(/Add your comment here.../i), {
    target: { value: 'This is a test comment' },
  })

  // Submit the form
  fireEvent.click(screen.getByText(/Send/i))

  await waitFor(() => {
    expect(mockUseCreateComment).toHaveBeenCalledWith({
      blog: blogId,
      content: 'This is a test comment',
    })
  })
})
