import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles.css"; // Ensure this file contains the navbar styles

const Navbar = () => {
  const location = useLocation(); // Get the current route

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token
    window.location.href = "/login"; // Redirect to login
  };

  return (
    <nav className="navbar">
      {/* Left Section */}
      <div className="navbar-left">
        <h1 className="navbar-brand">Bookstore</h1>
      </div>

      {/* Center Section */}
      <div className="navbar-center">
        <ul className="navbar-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/books">Books</Link>
          </li>
          {localStorage.getItem("token") && (
            <li>
              <Link to="/admin">Admin Panel</Link>
            </li>
          )}
        </ul>
      </div>

      {/* Right Section */}
      <div className="navbar-right">
        {localStorage.getItem("token") ? (
          <button className="logout-link" onClick={handleLogout}>
            Logout
          </button>
        ) : location.pathname === "/login" ? (
          <Link to="/register" className="register-link">
            Register
          </Link>
        ) : (
          <Link to="/login" className="login-link">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
