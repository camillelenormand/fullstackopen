import Blog from './Blog'

const BlogList = ({ blogs }) => {
  return (
    <table>
    <thead>
      <tr>
        <th>Title</th>
        <th>Author</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {blogs.map((blog, index) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </tbody>
  </table>
  )
}

export default BlogList
