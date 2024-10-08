import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CustomNavLink from "../NavLink";

export default function CustomNavbar() {
  const navigate = useNavigate();
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Dashboard</Navbar.Brand>
        <Nav className="me-auto">
          <CustomNavLink action={() => navigate("/")}>Home</CustomNavLink>
          <CustomNavLink action={() => navigate("/categories")}>
            Categories
          </CustomNavLink>
          <CustomNavLink action={() => navigate("/talents")}>
            Talents
          </CustomNavLink>
          <CustomNavLink action={() => navigate("/events")}>
            Events
          </CustomNavLink>
          <CustomNavLink action={() => navigate("/participant")}>
            Participant
          </CustomNavLink>
          <CustomNavLink action={() => navigate("/transactions")}>
            Transactions
          </CustomNavLink>
        </Nav>
      </Container>
    </Navbar>
  );
}
