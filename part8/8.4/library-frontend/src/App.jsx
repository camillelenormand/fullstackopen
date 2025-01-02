import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { NavLink, Route, Routes } from "react-router";
import styled from "styled-components"


const Nav = styled.nav`
 background-color: #f5f5f5;
 padding: 1rem;
 margin-bottom: 2rem;

 a {
   margin-right: 2rem;
   text-decoration: none;
   color: #666;
   font-weight: 500;

   &:hover {
     color: #000;
   }

   &.active {
     color: #000;
     border-bottom: 2px solid #000;
   }
 }
`

const App = () => {

  return (
    <div>
      <Nav>
        <NavLink  to="/authors">Authors</NavLink>
        <NavLink to="/books">Books</NavLink>
        <NavLink to="/add">Add a book</NavLink>
      </Nav>

      <Routes>
        <Route path="/authors" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook />} />
        <Route path="/" element={<Authors />} />
      </Routes>
    </div>
  );
};

export default App;
