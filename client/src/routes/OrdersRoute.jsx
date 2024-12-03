import React from "react";
import { Route, Routes } from "react-router-dom";
import OrdersPage from "../pages/orders";

export default function OrdersRoute() {
  return (
    <Routes>
      <Route path="/" element={<OrdersPage />} />
    </Routes>
  );
}
