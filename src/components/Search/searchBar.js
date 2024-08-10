import React from 'react';
import './searchBar.css';

const SearchBar = ({ query, setQuery }) => {
  return (
    <div className="search-bar-container">
      <input
        type="text"
        className="search-bar"
        placeholder="Search for movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
