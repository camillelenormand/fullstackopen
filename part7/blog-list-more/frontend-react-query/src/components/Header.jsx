import { Link } from 'react-router-dom'
import styled from 'styled-components'
import LogoutButton from './LogOutButton'
import { useAuth } from '../contexts/AuthContext'

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
  const { authState } = useAuth()

  return (
    <HeaderContainer>
      <Nav>
        <NavLink to="/blogs">Blogs</NavLink>
        <NavLink to="/users">Users</NavLink>
        <NavLink to="/blogs/new">Create a New Blog</NavLink>
      </Nav>
      <p>Welcome {authState?.username}!</p>
      {authState ? <LogoutButton /> : <NavLink to="/login">Login</NavLink>}
    </HeaderContainer>
  )
}

export default Header
