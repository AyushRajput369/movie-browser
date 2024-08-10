import React, { useEffect, useState } from 'react';
import { fetchGenres } from '../services/movieService';

const FilterOptions = ({ filters, setFilters }) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const loadGenres = async () => {
      const genreData = await fetchGenres();
      setGenres(genreData);
    };
    loadGenres();
  }, []);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="filter-options">
      <select name="genre" onChange={handleChange}>
        <option value="">All Genres</option>
        {genres.map(genre => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
      <input
        type="number"
        name="year"
        placeholder="Year"
        onChange={handleChange}
      />
      <input
        type="number"
        name="rating"
        placeholder="Rating"
        onChange={handleChange}
      />
    </div>
  );
};

export default FilterOptions;
