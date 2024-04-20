import styled from 'styled-components'

const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  width: 50%;
`

const CommentCard = styled.li`
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f4f4f4;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-top: 10px;
  margin-bottom: 10px;
  list-style-type: none;
`

const Comments = ({ comments }) => {
  return (
    <>
      <CommentsContainer>
        <ul>
          {comments.map((comment) => (
            <CommentCard key={comment.id}>{comment.content}</CommentCard>
          ))}
        </ul>
      </CommentsContainer>
    </>
  )
}

export default Comments