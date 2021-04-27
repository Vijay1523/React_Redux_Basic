import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav,NavItem } from "react-bootstrap";
import "./Header.css";

const Header = () => {
  return (
    <div>
        <Navbar bg="light" variant="light">
          <Navbar.Brand as={Link} to="/">
            User Management
          </Navbar.Brand>
          <Nav className="mr-auto">
            <NavItem>
              {" "}
              <Link className="nav-link" to="/">
                User List
              </Link>{" "}
            </NavItem>
            <NavItem>
              {" "}
              <Link className="nav-link" to="/add">
                Add User
              </Link>{" "}
            </NavItem>
          </Nav>
        </Navbar>
    </div>
  );
};

export default Header;
