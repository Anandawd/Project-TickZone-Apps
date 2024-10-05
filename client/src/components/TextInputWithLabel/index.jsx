import React from "react";
import Form from "react-bootstrap/Form";
import TextInput from "../TextInput";

export default function TextInputWithLabel({
  label,
  name,
  value,
  type,
  onChange,
  placeholder,
}) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <TextInput
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </Form.Group>
  );
}
