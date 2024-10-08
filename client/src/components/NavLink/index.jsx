import React from "react";
import { Nav } from "react-bootstrap";

export default function CustomNavLink({ action, children }) {
  return <Nav.Link onClick={action}>{children}</Nav.Link>;
}
