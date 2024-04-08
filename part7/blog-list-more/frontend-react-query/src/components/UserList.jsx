import UserService from '../services/users'
import { useQuery } from 'react-query'
import { Link, useMatch } from 'react-router-dom'
import User from './User'

const UserList = () => {
  // Fetch all users
  const { isLoading, isError, error, data: users } = useQuery(
    'users', 
    UserService.getAllUsers
  )
  const match = useMatch('/users/:id') 
  const user = match 
    ? users?.find(user => user.id === match.params.id) 
    : null


  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {error.message}</div>

  // Check if there are no users after loading is complete
  if (!isLoading && users?.length === 0) 
    return <div>No users to display.</div>

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Blogs</th>
          </tr>
        </thead>
        <tbody>
          {users?.map(user => (
            <tr key={user.id}>
              <td>
                <Link 
                  to={`/users/${user.id}`} 
                  element=
                  {
                  <User user={user} />
                  }
                >
                  {user.name}
                </Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserList
