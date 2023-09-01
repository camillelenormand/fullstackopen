import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [expandedRows, setExpandedRows] = useState([])

  const toggleRow = (rowId) => {
    expandedRows.includes(rowId)
      ? setExpandedRows(expandedRows.filter((id) => id !== rowId))
      : setExpandedRows(expandedRows.concat(rowId))
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
          <td colSpan="2">{blog.likes}</td>
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
