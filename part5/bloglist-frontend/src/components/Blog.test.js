import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra'
  }

  const { container } = render(<Blog blog={blog} updateBlog={() => {}} deleteBlog={() => {}}/>)

  const author = container.querySelector('.author')
  expect(author).toHaveTextContent('Edsger W. Dijkstra')

  const title = container.querySelector('.title')
  expect(title).toHaveTextContent('Canonical string reduction')


})
