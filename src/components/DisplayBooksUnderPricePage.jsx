import React, { useState, useContext } from 'react';
import { InventoryContext } from '../InventoryContext';
import { Link } from 'react-router-dom';

// DisplayBooksUnderPrice's Logic to display books under a certain price
function DisplayBooksUnderPricePage() {
    // State hook for managing price input
    const [price, setPrice] = useState('');
     // Accessing inventory data from context
    const { inventory } = useContext(InventoryContext);
    // State hook for managing the filtered list of books
    const [filteredBooks, setFilteredBooks] = useState([]);

     // Core Logic that Filters books where the price is less than the input price
    const handleSearch = () => {
        const results = inventory.filter(book => book.getAttribute('price') < price);
        // Updating the state with the filtered results
        setFilteredBooks(results);
    };

    // Displays DisplayBooksUnderPricePage
    return (
        <div>
            <h2>Display Books Under a Certain Price</h2>
            <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter Price"
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


export default DisplayBooksUnderPricePage;
