import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";

const Home = () => {
  const token = localStorage.getItem("token");
  let userRole = null;

  if (token) {
    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      userRole = decodedToken.role;
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <h1>Welcome to Our Bookstore</h1>
        <p>Your one-stop shop for all your reading needs.</p>
        <Link to="/books" className="primary-button">
          Browse Books
        </Link>
      </div>

      {/* Quick Links Section */}
      <div className="quick-links">
        <h2>Quick Links</h2>
        <ul>
          <li>
            <Link to="/books">Browse Books</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          {userRole === "ROLE_ADMIN" && (
            <li>
              <Link to="/admin">Admin Panel</Link>
            </li>
          )}
        </ul>
      </div>

      {/* Promotional Section */}
      <div className="promo-section">
        <h2>Don't Miss Out!</h2>
        <p>Get up to 50% off on selected books. Limited time only!</p>
        <Link to="/books" className="primary-button">
          Shop Now
        </Link>
      </div>
    </div>
  );
};

export default Home;
