import React from "react";
import { Container } from "react-bootstrap";
import CustomBreadcrumb from "../../components/Breadcrumb";

export default function Dashboard() {
  return (
    <>
      <Container className="mt-3">
        <CustomBreadcrumb />
        <h1>Dashboard</h1>
      </Container>
    </>
  );
}
