import React from "react";
import { Link } from "react-router-dom";
import "../styles.css"; // Ensure you have corresponding styles for admin panel

const AdminPanel = () => {
  return (
    <div className="admin-panel-container">
      <h1 className="admin-panel-title">Admin Panel</h1>

      {/* Manage Books Section */}
      <div className="admin-panel-section">
        <h2 className="admin-panel-subtitle">Manage Books</h2>
        <ul className="admin-panel-list">
          <li className="admin-panel-item">
            <Link to="/books" className="admin-panel-link">
              View All Books
            </Link>
          </li>
          <li className="admin-panel-item">
            <Link to="/admin/add-book" className="admin-panel-link">
              Add New Book
            </Link>
          </li>
        </ul>
      </div>

      {/* Manage Users Section */}
      <div className="admin-panel-section">
        <h2 className="admin-panel-subtitle">Manage Users</h2>
        <ul className="admin-panel-list">
          <li className="admin-panel-item">
            <Link to="/admin/users" className="admin-panel-link">
              View All Users
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminPanel;
