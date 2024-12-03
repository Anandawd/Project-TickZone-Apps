import React from "react";
import { Route, Routes } from "react-router-dom";
import PaymentsPage from "../pages/payments";
import CreatePage from "../pages/payments/create";
import EditPage from "../pages/payments/edit";

export default function PaymentsRoute() {
  return (
    <Routes>
      <Route path="/" element={<PaymentsPage />} />
      <Route path="/create" element={<CreatePage />} />
      <Route path="/edit/:paymentId" element={<EditPage />} />
    </Routes>
  );
}
