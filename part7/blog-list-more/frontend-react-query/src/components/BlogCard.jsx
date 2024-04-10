import React from 'react'
import { BlogTitle, BlogAuthor, BlogUrl, BlogCardDiv } from './BlogListStyles'
import Button from './Button'
import { Link } from 'react-router-dom'
import Blog from './Blog'

const BlogCard = React.memo(({ blog, onDelete, onLike, isLikeLoading, isDeleteLoading }) => (
  <BlogCardDiv>
    <BlogTitle>
      <Link
        to={`/blogs/${blog.id}`}
        element={<Blog />}>
        {blog.title}
      </Link>
    </BlogTitle>
    <BlogAuthor>{blog.author}</BlogAuthor>
    <BlogUrl as="a" href={blog.url} target="_blank" rel="noopener noreferrer">
      Visit Blog
    </BlogUrl>
    <Button
      id="like"
      onClick={() => onLike(blog)}
      disabled={isLikeLoading}
      aria-label={`Like ${blog.title}`}
    >
      {blog.likes} Likes
    </Button>
    <Button
      id="delete"
      onClick={() => onDelete(blog)}
      disabled={isDeleteLoading}
      aria-label={`Delete ${blog.title}`}
    >
      Delete
    </Button>
  </BlogCardDiv>
))

export default BlogCard
