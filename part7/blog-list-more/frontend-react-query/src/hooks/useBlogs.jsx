import { useQuery } from 'react-query'
import blogService from '../services/blogs'

export const useBlogs = ({ page, limit }) => {
  const queryKey = ['blogs', page, limit]
  const queryInfo = useQuery(
    queryKey,
    () => blogService.getAllBlogs({ page, limit }),
    {
      keepPreviousData: true, // This will keep showing the previous page's data while loading the next page's data.
      staleTime: 60_000, // Data will be fresh for 1 minute.
    }
  )

  return queryInfo // This returns the whole query object including data, isLoading, isError, etc.
}
