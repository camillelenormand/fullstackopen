

const Blog = ({ blog }) => {
  // Destructure author, url, and title from the blog object

  return (
    <div className="blog"> {/* Add a class name for styling */}
      <h3>{blog.title}</h3>
      <p><i>- {blog.author}</i></p>
        {blog.url}
    </div>
  )
}

export default Blog;
