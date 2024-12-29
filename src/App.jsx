import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminPanel from "./pages/AdminPanel";
import BookList from "./pages/BookList";
import AddBook from "./pages/AddBook";
import AllUsers from "./pages/AllUsers";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import Logout from "./pages/Logout";

const App = () => {
  return (
    <Router>
      <Navbar /> {/* The Navbar is outside Routes so it appears on every page */}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Panel */}
        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRoles={["ROLE_ADMIN"]}>
              <AdminPanel />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/add-book"
          element={
            <PrivateRoute allowedRoles={["ROLE_ADMIN"]}>
              <AddBook />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <PrivateRoute allowedRoles={["ROLE_ADMIN"]}>
              <AllUsers />
            </PrivateRoute>
          }
        />

        {/* Books Section */}
        <Route
          path="/books"
          element={
            <PrivateRoute allowedRoles={["ROLE_ADMIN", "ROLE_USER"]}>
              <BookList />
            </PrivateRoute>
          }
        />
        <Route
        path="/logout"
        element={
          <PrivateRoute allowedRoles={["ROLE_ADMIN", "ROLE_USER"]}>
            <Logout />
          </PrivateRoute>
          }
        />

      </Routes>
    </Router>
  );
};

export default App;
