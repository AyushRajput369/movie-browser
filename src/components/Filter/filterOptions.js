import React, { useEffect, useState } from 'react';
import { getRequest } from '../../services/commonApi';
import { useHeaders } from '../../hooks/useHeader';
import { useCustomToast } from "../../hooks/useToast";
import './filterOptions.css'; // Import the CSS file

const FilterOptions = ({ filters, setFilters }) => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const headers = useHeaders();
  const { showToast } = useCustomToast();
  
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const loadGenres = async () => {
      const genreData = await fetchGenres();
      setGenres(genreData);
    };
    loadGenres();
  }, []);

  const errorHandler = (error) => {
    showToast(error, "error");
  };

  const fetchGenres = async () => {
    setLoading(true);
    const url = `/genre/movie/list`;
    const response = await getRequest(url, headers, errorHandler);
    setLoading(false);
    if (!response) {
      return [];
    }
    return response?.data?.genres ?? [];
  };

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="filter-options">
      <div className="filter-group">
        <label htmlFor="genre" className="filter-label">Genre</label>
        <select
          id="genre"
          name="genre"
          value={filters.genre}
          onChange={handleChange}
          className="filter-select"
        >
          <option value="">All Genres</option>
          {genres?.map(genre => (
            <option key={genre?.id} value={genre?.id}>
              {genre?.name}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="year" className="filter-label">Year</label>
        <input
          id="year"
          type="number"
          name="year"
          value={filters.year}
          placeholder="Year"
          onChange={handleChange}
          className="filter-input"
          min="1888"
          max={currentYear}
        />
      </div>

      <div className="filter-group">
        <label htmlFor="rating" className="filter-label">Rating</label>
        <input
          id="rating"
          type="number"
          name="rating"
          value={filters.rating}
          placeholder="Rating"
          onChange={handleChange}
          className="filter-input"
          min="1"
          max="10"
        />
      </div>
    </div>
  );
};

export default FilterOptions;
