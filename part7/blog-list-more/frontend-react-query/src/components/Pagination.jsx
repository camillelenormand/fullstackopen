import Button from "./Button"

const Pagination = ({ page, hasNextPage, onPrevious, onNext }) => (
  
  <div>
    <Button onClick={onPrevious} disabled={page === 1}>Previous</Button>
    <Button onClick={onNext} disabled={!hasNextPage}>Next</Button>
  </div>
  )

export default Pagination