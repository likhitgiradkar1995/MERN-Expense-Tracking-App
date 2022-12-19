import Cookies from "js-cookie";
import React from "react";
import { Navigate } from "react-router-dom";

function Guest({ children }) {
  const token = Cookies.get("token");

  return !token ? children : <Navigate to="/" replace={true} />;
}

export default Guest;
