import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import * as React from "react";

export default function GuestOnlyRoute({ children }) {
  let { token } = useSelector((state) => state.auth);

  if (token) return <Navigate to={"/"} replace={true} />;
  return children || <Outlet />;
}
