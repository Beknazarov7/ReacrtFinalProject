import React, { useState, useEffect } from "react";
import axios from "axios";
import "../BookList.css"; // Assuming you have styles in a separate CSS file

const BookList = () => {
  const [books, setBooks] = useState([]); // Store the books
  const [page, setPage] = useState(0); // Current page number
  const [size] = useState(10); // Page size
  const [hasMore, setHasMore] = useState(true); // Check if there are more pages
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch books from the backend
  const fetchBooks = async (pageNumber, pageSize) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `http://localhost:8080/api/books?page=${pageNumber}&size=${pageSize}`
      );
      const newBooks = response.data;

      // Update state with unique books only
      if (newBooks.length === 0) {
        setHasMore(false); // No more data
      } else {
        setBooks((prevBooks) => {
          const bookMap = new Map();
          [...prevBooks, ...newBooks].forEach((book) => {
            bookMap.set(book.id, book); // Ensures uniqueness by ID
          });
          return Array.from(bookMap.values());
        });
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      setError("Failed to load books. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchBooks(page, size);
  }, [page]);

  // Load more books when "Load More" is clicked
  const loadMoreBooks = () => {
    if (hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="book-list-container">
      <h1 className="book-list-title">Book List</h1>

      {/* Book list display */}
      <div className="book-list-grid">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <h2 className="book-title">{book.title}</h2>
            <p className="book-author">Author: {book.authorName}</p>
            <p className="book-price">Price: ${book.price}</p>
          </div>
        ))}
      </div>

      {/* Error message */}
      {error && <p className="error-message">{error}</p>}

      {/* Load more button */}
      {hasMore && !loading && (
        <button className="load-more-button" onClick={loadMoreBooks}>
          Load More
        </button>
      )}

      {/* Loading indicator */}
      {loading && <p className="loading-message">Loading...</p>}
    </div>
  );
};

export default BookList;
