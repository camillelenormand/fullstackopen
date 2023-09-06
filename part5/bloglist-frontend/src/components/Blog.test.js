import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'


describe('Blog component test', () => {
  const blog = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: '12',
  }

test('renders content', () => {

  const { container } = render(
    <Blog blog={blog} updateBlog={() => {}} deleteBlog={() => {}}/>
  )

  const author = container.querySelector('.author')
  expect(author).toHaveTextContent('Edsger W. Dijkstra')

  const title = container.querySelector('.title')
  expect(title).toHaveTextContent('Canonical string reduction')

})

test('clicking show more button', async () => {
  
  const mockHandler = jest.fn()

  const { container } = render(
    <Blog blog={blog} updateBlog={mockHandler} />
  )

  const button = screen.getByText('Show')
  fireEvent.click(button)
  
  expect(container).toHaveTextContent('http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html')
  expect(container).toHaveTextContent('12')

  })

  test('button like clicked twice', async () => {
    const mockHandler = jest.fn()

    const { container } = render(
      <Blog blog={blog} updateBlog={mockHandler} />
    )

    const showButton = screen.getByText('Show')
    fireEvent.click(showButton)
    const likeButton = screen.getByText('Like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })

  test('like button with user-event library', async () => {
    const mockHandler = jest.fn()

    render(
      <Blog blog={blog} updateBlog={mockHandler} />
    )

    const user = userEvent.setup()
    const showButton = screen.getByText('Show')
    await user.click(showButton)
    const likeButton = screen.getByText('Like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })

  test('show button with user-event library', async () => {
  const mockHandler = jest.fn()

  render(
    <Blog blog={blog} updateBlog={mockHandler} />
  )

  const user = userEvent.setup()
  const showButton = screen.getByText('Show')
  await user.click(showButton)
  
  const like = screen.getByText('Likes: 12')
  const url = screen.getByText('URL: http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html')
  
  expect(url).toHaveTextContent('http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html')
  expect(like).toHaveTextContent('12')

  })



})
