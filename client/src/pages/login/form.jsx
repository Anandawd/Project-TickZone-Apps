import React from "react";
import { Form } from "react-bootstrap";
import CustomButton from "../../components/Button";
import TextInputWithLabel from "../../components/TextInputWithLabel";

export default function FormLogin({
  form,
  handleChange,
  handleSubmit,
  isLoading,
}) {
  return (
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

      <CustomButton
        loading={isLoading}
        disable={isLoading}
        action={handleSubmit}
        variant="primary"
        type="submit"
      >
        Submit
      </CustomButton>
    </Form>
  );
}
