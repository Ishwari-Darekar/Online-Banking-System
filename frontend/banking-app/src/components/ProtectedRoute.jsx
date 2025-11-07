import React from "react";
import { Navigate } from "react-router-dom";

// isEmp = true if it's for employee-only pages (optional)
const ProtectedRoute = ({ children }) => {
  const userId = localStorage.getItem("userId");
  console.log("ProtectedRoute userId:", userId); // debug

  if (!userId) {
    // Redirect to login if not logged in
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
