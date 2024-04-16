import { useState } from 'react'

const usePagination = (initialPage = 1) => {
  const [page, setPage] = useState(initialPage)

  const nextPage = () => setPage((currentPage) => currentPage + 1)
  const prevPage = () => setPage((currentPage) => Math.max(currentPage - 1, 1))
  const goToPage = (pageNumber) => setPage(pageNumber)

  return { page, nextPage, prevPage, goToPage }
}

export default usePagination