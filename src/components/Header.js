import React, {useEffect} from 'react';
import {Navbar, Container} from 'react-bootstrap';

function Header() {
  return (
    <Navbar className="bg-red-200">
      <Container>
        <Navbar.Brand href="/">Nobetci Eczaneler</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Header;
