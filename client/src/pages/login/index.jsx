import React, { useState } from "react";
import { Card, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import CustomAlert from "../../components/Alert";
import FormLogin from "./form";

import { userLogin } from "../../redux/auth/actions";
import { postData } from "../../utils/fetch";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [alert, setAlert] = useState({
    status: false,
    message: "",
    type: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);

    const res = await postData(`/cms/auth/signin`, form);

    if (res?.data?.data) {
      dispatch(
        userLogin(
          res.data.data.token,
          res.data.data.role,
          res.data.data.refreshToken,
          res.data.data.email
        )
      );
      setIsLoading(false);
      navigate("/");
    } else {
      setIsLoading(false);
      setAlert({
        status: true,
        message: res?.response?.data?.msg ?? "Internal server error",
        type: "danger",
      });
    }
  };

  return (
    <Container md={12}>
      <div className="m-auto mt-5" style={{ width: "50%" }}>
        {alert.status && (
          <CustomAlert message={alert.message} type={alert.type} />
        )}
      </div>
      <Card style={{ width: "50%" }} className="m-auto mt-3">
        <Card.Body>
          <Card.Title className="text-center mb-3">Login</Card.Title>
          <FormLogin
            form={form}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </Card.Body>
      </Card>
    </Container>
  );
}
