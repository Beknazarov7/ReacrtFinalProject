import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // No token found, redirect to login
    console.error("No token found.");
    return <Navigate to="/login" />;
  }

  try {
    // Decode the token
    const decoded = JSON.parse(atob(token.split(".")[1]));

    const {exp, role} = decoded;
    //const userRole = decoded.role;

    // Check if the token is expired
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    if (exp && exp < currentTime) {
      console.warn("Token has expired.");
      localStorage.removeItem("token"); // Clear expired token
      return <Navigate to="/login" />;
    }

    // Check if the user role matches the allowed roles
    if (allowedRoles && !allowedRoles.includes(role)) {
      console.warn("Unauthorized access.");
      return <Navigate to="/" />; // Redirect to home if unauthorized
    }

    // Authorized access, render the children components
    return children;
  } catch (error) {
    console.error("Error decoding token or invalid token structure:", error);
    // Clear invalid token and redirect to login
    localStorage.removeItem("token");
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
