import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import './Navbar.scss';

function NavbarComponent() {
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="#home">Logo</Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Item>Gear Icon</Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
