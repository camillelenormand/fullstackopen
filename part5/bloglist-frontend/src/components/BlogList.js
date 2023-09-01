import Blog from './Blog'

const BlogList = ({ blog, updateBlog }) => {
  console.log(blog)
  console.log(updateBlog)
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
        {blog?.map((blog, index) => (
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
