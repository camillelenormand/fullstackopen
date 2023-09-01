import React, { useEffect, useState } from 'react'

const Blog = ({ blog, updateBlog }) => {
  const [blogObject, setBlogObject] = useState(blog)
  const [expandedRows, setExpandedRows] = useState([])

  const toggleRow = (rowId) => {
    expandedRows.includes(rowId)
      ? setExpandedRows(expandedRows.filter((id) => id !== rowId))
      : setExpandedRows(expandedRows.concat(rowId))
  }

  const blogRowStyle = {
    textAlign: 'center'
  }

  useEffect(() => {
    setBlogObject(blog)
  }, [blog])

  const addLike = () => {
    console.log('Adding like to blog', blog.id)
    const updatedBlog = { 
      ...blog, likes: blog.likes + 1 
    }
    updateBlog(updatedBlog)
    console.log('Updated blog', updatedBlog)
    setBlogObject(updatedBlog)
  }

  return (
    <>
      <tr>
        <td>{blog.title ? blog.title : 'No title'}</td>
        <td>{blog.author ? blog.author : 'No author'}</td>
        <td>
          <button onClick={() => toggleRow(blog.id)}>
            {expandedRows.includes(blog.id) ? 'Hide Details' : 'Read more'}
          </button>
        </td>
      </tr>
      {expandedRows.includes(blog.id) && (
        <tr>
          <th>URL</th>
          <td colSpan="2">{blog.url ? blog.url : 'No url'}</td>
        </tr>
      )}
      {expandedRows.includes(blog.id) && (
        <tr>
          <th>Likes:</th>
          <td colSpan='1'>{blogObject.likes}</td>
          <td colSpan='2' style={blogRowStyle}><button onClick={addLike}><i className="gg-heart"></i></button></td>
        </tr>
      )}
        {expandedRows.includes(blog.id) && (
        <tr>
          <th>User</th>
          <td colSpan='2'>{blog.user && blog.user.name ? blog.user.name : 'No user'}</td>
        </tr>
      )}
    </>
  )
}

export default Blog
