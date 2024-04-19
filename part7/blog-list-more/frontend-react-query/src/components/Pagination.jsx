import Button from './Button'
import styled from 'styled-components'

const PaginationStyle = styled.div
`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`

const Pagination = ({ page, hasNextPage, onPrevious, onNext }) => (
  
  <PaginationStyle>
    <Button onClick={onPrevious} disabled={page === 1}>Previous</Button>
    <Button onClick={onNext} disabled={!hasNextPage}>Next</Button>
  </PaginationStyle>
  )

export default Pagination