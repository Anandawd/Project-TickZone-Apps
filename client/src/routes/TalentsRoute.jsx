import React from "react";
import { Route, Routes } from "react-router-dom";
import TalentsPage from "../pages/talents";
import CreatePage from "../pages/talents/create";
import EditPage from "../pages/talents/edit";

export default function TalentsRoute() {
  return (
    <Routes>
      <Route path="/" element={<TalentsPage />} />
      <Route path="/create" element={<CreatePage />} />
      <Route path="/edit/:talentId" element={<EditPage />} />
    </Routes>
  );
}
