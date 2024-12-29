import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    navigate("/login"); // Redirect to login
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Are you sure you want to logout?</h1>
      <button onClick={handleLogout} style={{ padding: "10px 20px", fontSize: "16px" }}>
        Logout
      </button>
    </div>
  );
};

export default Logout;
