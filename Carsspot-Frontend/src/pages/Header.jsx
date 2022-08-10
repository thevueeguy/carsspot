import React, { useContext } from 'react'
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import Container from 'react-bootstrap/Container';
import { UserContext } from '../context/UserContext';

const Header = () => {
  const { user, logout } = useContext(UserContext);
  const logoutHandler = () => {
    logout();
  }

  return (
    <header style={{ width: "99vw" }}>
      {user ? (
        <Navbar variant="dark" bg="dark" expand="lg">
          <Container fluid>
            <LinkContainer to="/" className=''>
              <Navbar.Brand><b>CARS SPOT</b></Navbar.Brand>
            </LinkContainer>

            <Navbar.Toggle aria-controls="navbar-dark-example" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <NavDropdown
                  id="nav-dropdown"
                  title={user.email}
                  menuVariant="dark"
                  className="mr-5"
                >
                  <NavDropdown.Item onClick={logoutHandler}>
                    logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>)
        : (
          <Navbar variant="dark" bg="dark" expand="lg">
            <Container fluid>
              <LinkContainer to="/" className=''>
                <Navbar.Brand><b>CARS SPOT</b></Navbar.Brand>
              </LinkContainer>

              <LinkContainer to="/login">
                <Nav.Item className="text-light"><b style={{ cursor: "pointer" }}>Login / Sign-up</b></Nav.Item>
              </LinkContainer>
            </Container>
          </Navbar>
        )}
    </header >
  )
}

export default Header