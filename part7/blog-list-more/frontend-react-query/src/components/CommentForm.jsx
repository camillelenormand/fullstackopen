import useCreateComment from '../hooks/useCreateComment'
import styled from 'styled-components'

const TitleStyle = styled.h2`
  ${props => props.theme.h2},
  padding: 10px;
  margin: 10px;
`

const CommentFormContainer = styled.div`
  padding: 10px;
`

const CommentForm = ({ blogId }) => {
  const createComment = useCreateComment(blogId)
  console.log('blogId:', blogId)

  const onCreate = async (e) => {
    e.preventDefault()
    const { content } = e.target.elements

    createComment.mutate({
      blog: blogId,
      content: content.value
    })

    e.target.reset()

  }

  return (
    // Add a form to create a new comment
    <>
      <TitleStyle>Comments</TitleStyle>
      <CommentFormContainer>
        <form onSubmit={onCreate}>
          <input
            type="text"
            name="content"
            placeholder="Add your comment here..."
            required
          />
          <button type="submit">Send</button>
        </form>
      </CommentFormContainer>
    </>
  )
}

export default CommentForm

