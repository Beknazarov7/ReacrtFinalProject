import React, { useEffect, useState } from "react";
import "../styles.css"; // Ensure styles for the table and error messages are included

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You are not logged in. Please log in to view this page.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:8080/api/admin/users", { // Correct endpoint
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 403) {
            throw new Error("Access denied. You are not authorized to view users.");
          }
          throw new Error("An error occurred while fetching users.");
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p className="loading-message">Loading users...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="all-users-container">
      <h2>Registered Users</h2>
      {users.length > 0 ? (
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-users-message">No users found.</p>
      )}
    </div>
  );
};

export default AllUsers;
