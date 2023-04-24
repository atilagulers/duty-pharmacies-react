import React from 'react';
import {Navbar, Container} from 'react-bootstrap';

function Header() {
  return (
    <Navbar className="bg-custom-black">
      <Container>
        <Navbar.Brand className="text-light d-flex align-items-center" href="/">
          <img
            className="me-2"
            src="/logo192.jpg"
            alt=""
            style={{width: '24px'}}
          ></img>
          Nöbetçi Eczaneler
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Header;
