import { Link } from 'react-router-dom'
import { Navbar, Nav, Button } from 'react-bootstrap'

const Menu = ({ user, handleClick }) => {
  const padding = {
    paddingRight: 5,
  }
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/">
              blogs
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/users">
              users
            </Link>
          </Nav.Link>
          {user.username} logged in
          <Button type="button" onClick={handleClick}>
            logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Menu

/*
<div>
      <Link style={padding} to="/">
        blogs
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
      {user.username} logged in
      <button type="button" onClick={handleClick}>
        logout
      </button>
    </div>
  */
