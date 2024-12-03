import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  accessCategories,
  accessEvents,
  accessOrders,
  accessParticipant,
  accessPayments,
  accessTalents,
} from "../../const/access";
import CustomNavLink from "../NavAccess";

export default function CustomNavbar() {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      let { role } = localStorage.getItem("auth")
        ? JSON.parse(localStorage.getItem("auth"))
        : {};

      setRole(role);
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/signin";
  };
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Dashboard</Navbar.Brand>
        <Nav className="me-auto">
          <CustomNavLink
            role={role}
            roles={accessCategories.read}
            action={() => navigate("/")}
          >
            Home
          </CustomNavLink>
          <CustomNavLink
            role={role}
            roles={accessCategories.read}
            action={() => navigate("/categories")}
          >
            Categories
          </CustomNavLink>
          <CustomNavLink
            role={role}
            roles={accessTalents.read}
            action={() => navigate("/talents")}
          >
            Talents
          </CustomNavLink>
          <CustomNavLink
            role={role}
            roles={accessPayments.read}
            action={() => navigate("/payments")}
          >
            Payment
          </CustomNavLink>
          {/* <NavLink
            role={role}
            roles={organizers.lihat}
            action={() => navigate('/organizers')}
          >
            Oranizer
          </NavLink> */}
          <CustomNavLink
            role={role}
            roles={accessEvents.read}
            action={() => navigate("/events")}
          >
            Events
          </CustomNavLink>
          <CustomNavLink
            role={role}
            roles={accessParticipant.read}
            action={() => navigate("/participant")}
          >
            Participant
          </CustomNavLink>
          <CustomNavLink
            role={role}
            roles={accessOrders.read}
            action={() => navigate("/orders")}
          >
            Orders
          </CustomNavLink>
        </Nav>
        <Nav className="justify-content-end">
          <Nav.Link onClick={() => handleLogout()}>Log out</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
