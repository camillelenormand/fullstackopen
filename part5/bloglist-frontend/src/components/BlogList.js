import Blog from './Blog'

const BlogList = ({ blog, updateBlog }) => {
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
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {sortedBlog?.map((blog) => (
          <Blog 
            key={blog.id} 
            blog={blog} 
            updateBlog={updateBlog}
          />
        ))}
      </tbody>
    </table>
  );
}

export default BlogList
