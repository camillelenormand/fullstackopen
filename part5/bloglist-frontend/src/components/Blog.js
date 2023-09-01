import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [expandedRows, setExpandedRows] = useState([])

  const toggleRow = (rowId) => {
    expandedRows.includes(rowId)
      ? setExpandedRows(expandedRows.filter((id) => id !== rowId))
      : setExpandedRows(expandedRows.concat(rowId))
  }

  const blogRowStyle = {
    textAlign: 'center'
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
          <th>Likes</th>
          <td colSpan='1'>{blog.likes}</td>
          <td colSpan='2' style={blogRowStyle}><button><i className="gg-heart"></i></button></td>
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
