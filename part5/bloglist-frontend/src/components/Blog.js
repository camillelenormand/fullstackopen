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
        <td>{blog.title}</td>
        <td>{blog.author}</td>
        <td>
          <button onClick={() => toggleRow(blog.id)}>
            {expandedRows.includes(blog.id) ? 'Hide Details' : 'Read more'}
          </button>
        </td>
      </tr>
      {expandedRows.includes(blog.id) && (
        <tr>
          <td colSpan="3"></td> {/* Empty cell for spacing */}
        </tr>
      )}
      {expandedRows.includes(blog.id) && (
        <tr>
          <th>URL</th>
          <td colSpan="2">{blog.url}</td>
        </tr>
      )}
      {expandedRows.includes(blog.id) && (
        <tr>
          <th>Likes</th>
          <td colSpan="1">{blog.likes}</td>
          <td colSpan="1" style={blogRowStyle}><button><i class="gg-heart"></i></button></td>
        </tr>
      )}
       {expandedRows.includes(blog.id) && (
        <tr>
          <td colSpan="3"></td> {/* Empty cell for spacing */}
        </tr>
      )}
    </>
  )
}

export default Blog
