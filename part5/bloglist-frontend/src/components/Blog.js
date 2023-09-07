import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Button from './Button'

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const [expandedRows, setExpandedRows] = useState([])
  const [blogObject, setBlogObject] = useState(blog)

  const toggleRow = (rowId) => {
    setExpandedRows((prevExpandedRows) =>
      prevExpandedRows.includes(rowId)
        ? prevExpandedRows.filter((id) => id !== rowId)
        : [...prevExpandedRows, rowId]
    )
  }

  useEffect(() => {
    setBlogObject(blog)
  }, [blog])

  const addLike = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    updateBlog(updatedBlog)
    setBlogObject(updatedBlog)
  }

  return (
    <article>
      <dl>
        <dt>Blog Information</dt>
        <dd className='title'>Title: {blog.title || 'No title'}</dd>
        <dd className='author'>Author: {blog.author || 'No author'}</dd>
      </dl>
      {expandedRows.includes(blog.id) && (
        <>
          <dd>URL: {blog.url || 'No url'}</dd>
          <dd>Likes: {blogObject.likes}</dd>
          <dd>
            <Button
              id='likeButton'
              onClick={addLike}
              label='Like'
              className='likeButton'
            />
          </dd>
          <dd>User: {blog.user?.name || 'No user'}</dd>
        </>
      )}
      <dd className='showDetails'>
        <Button
          id='showDetailsButton'
          onClick={() => toggleRow(blog.id)}
          label={expandedRows.includes(blog.id) ? 'Hide' : 'Show'}
          className='showDetailsButton'
          style={{ marginRight: '5px' }}
        />
        <Button
          id='deleteButton'
          label="Delete"
          onClick={() => deleteBlog(blog)}
        />
      </dd>
    </article>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog
