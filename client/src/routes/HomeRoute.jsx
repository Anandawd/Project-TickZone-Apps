import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardPage from "../pages/dashboard";

export default function HomeRoute() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
    </Routes>
  );
}
