import React from "react";
import { Route, Routes } from "react-router-dom";
import EventsPage from "../pages/events";
import Create from "../pages/events/create";
import Edit from "../pages/events/edit";

export default function EventsRoute() {
  return (
    <Routes>
      <Route path="/" element={<EventsPage />} />
      <Route path="/create" element={<Create />} />
      <Route path="/edit/:eventId" element={<Edit />} />
    </Routes>
  );
}
