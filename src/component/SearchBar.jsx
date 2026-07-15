import { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
    const [city, setCity] = useState('');
    



    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmedCity = city.trim();
        if (trimmedCity) {
            onSearch(trimmedCity);
            setCity('');
        }
    };

    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <span className="search-icon" aria-hidden="true"><BiSearch /></span>
            <input
                className="search-input"
                type="text"
                placeholder="Enter city name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchBar;