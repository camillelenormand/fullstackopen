import useCreateCommentMutation from '../hooks/useCreateCommentMutation'

const CommentForm = ({ blogId }) => {
  const createCommentMutation = useCreateCommentMutation(blogId)
  console.log('blogId:', blogId)

  const onCreate = async (e) => {
    e.preventDefault()
    const { content } = e.target.elements
    console.log(content.value)
    console.log(blogId)

    createCommentMutation.mutate({
      blog: blogId,
      content: content.value
    })

    e.target.reset()

  }

  return (
    <form onSubmit={onCreate}>
      <input
        type="text"
        name="content"
        placeholder="Add your comment here..."
        required
      />
      <button type="submit">Send</button>
    </form>
  )
}

export default CommentForm

