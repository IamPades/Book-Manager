import React, { useState, useContext } from 'react';
import { InventoryContext } from '../InventoryContext';
import { Link } from 'react-router-dom';

// DisplayByAuthor's Logic to search and display books by Author
function DisplayBooksByAuthorPage() {
    // State hook for managing author input
    const [author, setAuthor] = useState('');
    // Accessing inventory data from context
    const { inventory } = useContext(InventoryContext);
    // State hook for managing the filtered list of books
    const [filteredBooks, setFilteredBooks] = useState([]);

    // Core Logic that Filters books where the author matches the input
    const handleSearch = () => {
        const results = inventory.filter(book => book.getAttribute('author').toLowerCase() === author.toLowerCase());
        // Updating the state with the filtered results
        setFilteredBooks(results);
    };

    // Displays DisplayByAuthorPage
    return (
        <div>
            <h2>Display Books by Author</h2>
            <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Enter Author's Name"
            />
            <button onClick={handleSearch}>Search</button>

            <div className="book-list">
                {filteredBooks.map((book, index) => (
                    <div key={index} className="book-item">
                        <p><strong>Title:</strong> {book.getAttribute('title')}</p>
                        <p><strong>Author:</strong> {book.getAttribute('author')}</p>
                        <p><strong>ISBN:</strong> {book.getAttribute('isbn')}</p>
                        <p><strong>Price:</strong> {book.getAttribute('price')}</p>
                    </div>
                ))}
            </div>
            <Link to="/main-menu" className="back-link">Back to Main Menu</Link>
        </div>
    );
}

export default DisplayBooksByAuthorPage;
