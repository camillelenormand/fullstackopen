import UserService from '../services/users'
import { useQuery } from 'react-query'
import { useMatch } from 'react-router-dom'

const User = () => {
  const { isLoading, isError, error, data: users } = useQuery(
    'users', 
    UserService.getAllUsers
  )

  const match = useMatch('/users/:id')

  console.log('users:', users)

  const user = match
    ? users?.find(user => user.id === match.params.id)
    : <p>No user found</p>

  if (!user) return null

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {error.message}</div>

  return (
    <>
      <ul>
        <h5>{user.name}'s blogs</h5>
          {user.blogs.map(blog => 
            <li key={blog.id}>{blog.title}
        </li>
      )}
      </ul>
    </>
  )
}

export default User