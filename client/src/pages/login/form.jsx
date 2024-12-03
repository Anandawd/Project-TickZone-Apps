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
        label={"Email"}
        name="email"
        value={form?.email}
        type="email"
        placeholder={"Masukkan email"}
        onChange={handleChange}
      />

      <TextInputWithLabel
        label={"Password"}
        name="password"
        value={form?.password}
        type="password"
        placeholder={"Masukkan password"}
        onChange={handleChange}
      />

      <CustomButton
        loading={isLoading}
        disable={isLoading}
        action={handleSubmit}
        variant="primary"
      >
        Submit
      </CustomButton>
    </Form>
  );
}
