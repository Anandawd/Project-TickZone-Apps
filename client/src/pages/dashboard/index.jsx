import React from "react";
import { Container, Table } from "react-bootstrap";
import CustomBreadcrumb from "../../components/Breadcrumb";
import CustomButton from "../../components/Button";
import CustomNavbar from "../../components/Navbar";

export default function Dashboard() {
  const token = localStorage.getItem("token");

  // if (!token) return <Navigate to="/login" replace={true} />;
  return (
    <>
      <CustomNavbar />
      <Container className="mt-3">
        <CustomBreadcrumb />
        <CustomButton>Tambah</CustomButton>
        <Table className="mt-3" striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>3</td>
              <td colSpan={2}>Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </>
  );
}
