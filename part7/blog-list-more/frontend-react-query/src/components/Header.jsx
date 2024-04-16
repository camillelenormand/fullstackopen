import {
  Link,
} from 'react-router-dom'
import styled from 'styled-components'
import LogoutButton from './LogOutButton'
import Notification from './Notification'
import { useAuth } from '../contexts/AuthContext'
import BlogForm from './BlogForm'

const HeaderStyle = styled.header`
  background-color: #f0f0f0;
  padding: 10px;
  margin-bottom: 10px;
`

const Header = () => {
  const { token } = useAuth()

  return (
    <>
      <HeaderStyle>
        <Notification />
        <Link to="/blogs">Blogs</Link>
        <Link to="/users">Users</Link>
        {
          !token ? (
            <Link to="/login">Login</Link>
          ) : (
            <>
              <Link to={`/blogs/new`} element={<BlogForm />}>Create a New Blog</Link>
              <LogoutButton />
            </>
          )
        }
      </HeaderStyle>
    </>
  )
}

export default Header