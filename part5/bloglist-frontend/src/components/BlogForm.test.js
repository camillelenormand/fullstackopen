import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

describe('<BlogForm /> component test', () => {
  test('renders form', async () => {
    const createBlog = jest.fn()

    render (
      <BlogForm createBlog={createBlog} />
    )

    // Show form
    const user = userEvent.setup()

    // Init form values
    const title = screen.getByLabelText('Title')
    const author = screen.getByLabelText('Author')
    const url = screen.getByLabelText('URL')
    const buttonSaveBlog = screen.getByText('Save')

    // Enter inputs and click save
    await user.type(title, 'Title for test')
    await user.type(author, 'Author for test')
    await user.type(url, 'wwww.fakeurl.com')

    await user.click(buttonSaveBlog)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Title for test')
    expect(createBlog.mock.calls[0][0].author).toBe('Author for test')
    expect(createBlog.mock.calls[0][0].url).toBe('wwww.fakeurl.com')

  })
})
