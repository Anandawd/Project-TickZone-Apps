import React from "react";
import { Nav } from "react-bootstrap";

export default function CustomNavLink({ action, children, role, roles }) {
  let isHas = roles.indexOf(role);

  return <>{isHas >= 0 && <Nav.Link onClick={action}>{children}</Nav.Link>}</>;
}
