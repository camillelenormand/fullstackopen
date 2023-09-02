import Blog from './Blog'

const BlogList = ({ blog, updateBlog, deleteBlog }) => {
  console.log(blog)

  const sortedBlog = blog.sort((a, b) => {
    return b.likes - a.likes
  })

  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>View</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {sortedBlog?.map((blog) => (
          <Blog 
            key={blog.id} 
            blog={blog} 
            updateBlog={updateBlog}
            deleteBlog={deleteBlog}
          />
        ))}
      </tbody>
    </table>
  );
}

export default BlogList
