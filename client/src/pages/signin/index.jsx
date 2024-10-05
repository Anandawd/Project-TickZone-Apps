import axios from "axios";
import { useState } from "react";
import { Card, Container, Form } from "react-bootstrap";
import CustomAlert from "../../components/Alert";
import CustomButton from "../../components/Button";
import TextInputWithLabel from "../../components/TextInputWithLabel";

function PageLogin() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://localhost:9000/api/v1/cms/auth/login",
        {
          email: form.email,
          password: form.password,
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container md={12}>
      <CustomAlert message={"Gagal login"} type={"danger"} />
      <Card style={{ width: "50%" }} className="m-auto mt-5">
        <Card.Body>
          <Card.Title className="text-center mb-3">Login</Card.Title>
          <Form>
            <TextInputWithLabel
              label="Email Address"
              name="Email"
              value={Form.email}
              type="email"
              placeholder="Enter email"
              onChange={handleChange}
            />

            <TextInputWithLabel
              label="Password"
              name="Password"
              value={Form.password}
              type="password"
              placeholder="Enter password"
              onChange={handleChange}
            />

            <CustomButton action={handleSubmit} variant="primary" type="submit">
              Submit
            </CustomButton>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default PageLogin;
