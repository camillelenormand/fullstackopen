import {
  Link,
} from 'react-router-dom'
import styled from 'styled-components'
import LogoutButton from './LogOutButton'
import Notification from './Notification'
import { useAuth } from '../contexts/AuthContext'
import BlogForm from './BlogForm'

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 10px 20px;
  font-family: 'Roboto', sans-serif;
`

const Nav = styled.nav`
  display: flex;
  gap: 20px;
`

const NavLink = styled(Link)`
  color: black;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
}
`


const Header = () => {
  const { token } = useAuth()

  return (
    <>
      <HeaderContainer>
        <Notification />
        <Nav>
          <NavLink to="/blogs">Blogs</NavLink>
          <NavLink to="/users">Users</NavLink>
          {!token ? null : <NavLink to={`/blogs/new`} element={<BlogForm />}>Create a New Blog</NavLink>}
        </Nav>
        {!token ? <NavLink to="/login">Login</NavLink> : <LogoutButton />}
      </HeaderContainer>
    </>
  )
}

export default Header