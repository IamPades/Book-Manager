import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { InventoryContext } from '../InventoryContext';
import Book from '../Book';

// NewBooksPage component for adding new books to the inventory
function NewBooksPage() {
  // State hooks for managing various aspects of the page
  const [password, setPassword] = useState('');
  const [attemptCount, setAttemptCount] = useState(0);
  const [bookDetails, setBookDetails] = useState({ title: '', author: '', isbn: '', price: '' });
  const [isBookAdded, setIsBookAdded] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  // Hook for programmatically navigating to other routes
  const navigate = useNavigate();
  // Constants for password validation and inventory limits
  const correctPassword = 'pargol';
  const maxAttempts = 3;
  // Accessing inventory data and functions from context
  const { inventory, setInventory, capacity } = useContext(InventoryContext);

  // Function to handle password submission
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsBookAdded(false);
      setPasswordError('');
    } else {
      setAttemptCount(attemptCount + 1);
      setPasswordError('Incorrect password, try again.');
      if (attemptCount +1 >= maxAttempts) {
      navigate('/main-menu');
      }
    }
  };

  // Function to handle changes in book detail inputs
  const handleBookDetailsChange = (e) => {
    const { name, value } = e.target;
    setBookDetails(prev => ({ ...prev, [name]: value }));
  };

  // Function to handle book submission
  const handleBookSubmit = (e) => {
    e.preventDefault();
    if (inventory.length < capacity) {
      const newBook = new Book(bookDetails.title, bookDetails.author, bookDetails.isbn, parseFloat(bookDetails.price));
      setInventory(prevInventory => [...prevInventory, newBook]);
      setIsBookAdded(true);
      // Reset form fields
      setBookDetails({ title: '', author: '', isbn: '', price: '' });
    } else {
      alert("Inventory is full. Cannot add more books.");
    }
  };

  // Render NewBooksPage's JSX
  return (
      <div>
        <h2>Enter New Books</h2>
        {attemptCount < maxAttempts ? (
            <form onSubmit={handlePasswordSubmit}>
              <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter Password"
              />
              <button type="submit">Submit Password</button>
              {passwordError && <p>{passwordError}</p>}
            </form>
        ) : (
            <p>Maximum password attempts reached. Return to <Link to="/main-menu">Main Menu</Link>.</p>
        )}

        {password === correctPassword && (
            <form onSubmit={handleBookSubmit}>
              <input
                  type="text"
                  name="title"
                  value={bookDetails.title}
                  onChange={handleBookDetailsChange}
                  placeholder="Book Title"
              />
              <input
                  type="text"
                  name="author"
                  value={bookDetails.author}
                  onChange={handleBookDetailsChange}
                  placeholder="Author"
              />
              <input
                  type="text"
                  name="isbn"
                  value={bookDetails.isbn}
                  onChange={handleBookDetailsChange}
                  placeholder="ISBN"
              />
              <input
                  type="number"
                  name="price"
                  value={bookDetails.price}
                  onChange={handleBookDetailsChange}
                  placeholder="Price"
              />
              <button type="submit">Add Book</button>
            </form>
        )}

        {isBookAdded && <p>Book added successfully!</p>}
        <p>Books in Inventory: {inventory.length} / {capacity}</p>
        <Link to="/main-menu" className="back-link">Back to Main Menu</Link>
      </div>
  );
}

export default NewBooksPage;
