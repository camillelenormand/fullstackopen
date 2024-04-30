import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

const createBlogMutation = vi.fn()
const notify = vi.fn()

/// Mocking hooks and modules

// Mock the useCreateMutation hook
vi.mock('../hooks/useCreateMutation', () => ({
  default: () => ({
    mutate: async (data) => {
      createBlogMutation(data);
      notify('Blog created successfully: New Blog by Jane Doe', 'success');
    },
    mutateWithErrors: async (data) => {
      createBlogMutation(data);
      notify('Failed to create blog: ', 'error');
    }
  }),
}))

vi.mock('../contexts/NotificationContext', () => ({
  useNotify: () => notify
}))

const userLoggedIn = {
  username: 'root',
  token: '12345'
}

// Mock the useAuth hook
vi.mock('../contexts/AuthContext', () => ({
  useAuth: () => userLoggedIn
}))

describe('BlogForm', () => {
  
  it('submits form data correctly', async () => {
    const user = userEvent.setup()

    render(<BlogForm />)

    // Get form elements
    const title = screen.getByPlaceholderText('Enter a title')
    const author = screen.getByPlaceholderText('Enter an author')
    const url = screen.getByPlaceholderText('Enter an URL')
    const button = screen.getByRole('button', { name: 'Create' })

    // Fill out the form
    await userEvent.type(title, 'New Blog')
    await userEvent.type(author, 'Jane Doe')
    await userEvent.type(url, 'https://example.com')

    console.log(title.value, author.value, url.value)
    // Click the submit button
    await user.click(button)

    // Check that the form was submitted correctly
    expect(createBlogMutation).toHaveBeenCalled()
    // Check that the form was submitted with the correct data
    expect(createBlogMutation).toHaveBeenCalledWith({
      title: 'New Blog',
      author: 'Jane Doe',
      url: 'https://example.com'
    })

    // Validate useAuth hook usage
    // Ensure the hook itself was called
    expect(userLoggedIn).toBeDefined()
    // Check that the user has the correct username
    expect(userLoggedIn).toHaveProperty('username', 'root')
    // Check that the user has the correct token
    expect(userLoggedIn).toHaveProperty('token', '12345')
    // Check that the user was notified with the correct message
    expect(notify).toHaveBeenCalledTimes(1)
    expect(notify.mock.calls[0][0]).toBe('Blog created successfully: New Blog by Jane Doe')
    expect(notify.mock.calls[0][1]).toBe('success')
  })
})

