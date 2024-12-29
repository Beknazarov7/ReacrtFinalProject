import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css"; // Ensure your styles are imported

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: "",
    authorName: "",
    genre: "",
    price: "",
    stock: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // To prevent duplicate submissions
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent multiple submissions
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token"); // Assuming token is stored in localStorage

      const response = await fetch("http://localhost:8080/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Book added successfully!");
        setFormData({ title: "", authorName: "", genre: "", price: "", stock: "" }); // Reset the form
        navigate("/books"); // Redirect to the book list
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to add book. Please try again.");
      }
    } catch (error) {
      console.error("Error adding book:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false); // Re-enable the submit button
    }
  };

  return (
    <div className="add-book-container">
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label htmlFor="authorName">Author</label>
        <input
          type="text"
          name="authorName"
          value={formData.authorName}
          onChange={handleChange}
          required
        />

        <label htmlFor="genre">Genre</label>
        <input
          type="text"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          required
        />

        <label htmlFor="price">Price</label>
        <input
          type="number"
          name="price"
          step="0.01" // Allow decimal prices
          value={formData.price}
          onChange={handleChange}
          required
        />

        <label htmlFor="stock">Stock</label>
        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default AddBook;
