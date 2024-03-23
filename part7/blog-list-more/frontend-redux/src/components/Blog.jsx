

const Blog = ({ blog, handleClick }) => {
  // Destructure author, url, and title from the blog object

  return (
    <div className="blog"> {/* Add a class name for styling */}
      <h3>{blog.title}</h3>
      <p><i>- {blog.author}</i></p>
        {blog.url}
        <button onClick={handleClick}> {blog.likes} Likes </button>
    </div>

  )
}

export default Blog;
