import { useEffect, useState } from 'react'
import Button from './Button'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, deleteBlog }) => {
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
    <tbody>
      <tr>
        <td className='title'>{blog.title ? blog.title : 'No title'}</td>
        <td className='author'>{blog.author ? blog.author : 'No author'}</td>
        <td style={blogRowStyle}>
          <button onClick={() => toggleRow(blog.id)}>
            {expandedRows.includes(blog.id) ? 'Hide' : 'Show'}
          </button>
        </td>
        <td><Button label="Delete" onClick={() => deleteBlog(blog)} /></td>
      </tr>
      {expandedRows.includes(blog.id) && (
        <tr>
          <th>URL</th>
          <td colSpan="3">{blog.url ? blog.url : 'No url'}</td>
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
          <td colSpan='3'>{blog.user && blog.user.name ? blog.user.name : 'No user'}</td>
        </tr>
      )}
    </tbody>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog
