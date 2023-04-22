import React, {useEffect} from 'react';
import {Navbar, Container} from 'react-bootstrap';

function Header() {
  return (
    <Navbar className="bg-custom-black">
      <Container>
        <Navbar.Brand className="text-light" href="/">
          Nobetci Eczaneler
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Header;
