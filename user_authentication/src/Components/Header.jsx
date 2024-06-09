import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

const Header = () => {
  return (
    <div>
      <Container fluid className="p-0">
        <Navbar className="w-100">
          <Navbar.Brand className="fw-bold" style={{  }}>
            Logo
          </Navbar.Brand>
        </Navbar>
      </Container>
    </div>
  );
};

export default Header;
