import { Navigate, Route, Routes } from "react-router-dom";
import GuardRoute from "../components/GuardRoute";
import GuestOnlyRoute from "../components/GuestOnlyRoute";
import CustomNavbar from "../components/Navbar";
import LoginPage from "../pages/login";

import CategoriesRoute from "./CategoriesRoute";
import EventsRoute from "./EventsRoute";
import HomeRoute from "./HomeRoute";
import OrdersRoute from "./OrdersRoute";
import PaymentsRoute from "./PaymentsRoute";
import TalentsRoute from "./TalentsRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/signin"
        element={
          <GuestOnlyRoute>
            <LoginPage />
          </GuestOnlyRoute>
        }
      ></Route>
      <Route
        path="/"
        element={
          <>
            <CustomNavbar />
            <GuardRoute />
          </>
        }
      >
        <Route path="/dashboard/*" element={<HomeRoute />} />
        <Route path="/categories/*" element={<CategoriesRoute />} />
        <Route path="/talents/*" element={<TalentsRoute />} />
        <Route path="/payments/*" element={<PaymentsRoute />} />
        <Route path="/events/*" element={<EventsRoute />} />
        <Route path="/orders/*" element={<OrdersRoute />} />
        <Route
          path=""
          element={<Navigate to={"/dashboard"} replace={true} />}
        />
      </Route>
    </Routes>
  );
}
