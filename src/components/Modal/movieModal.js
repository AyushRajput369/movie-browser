import React, { useState } from 'react';
import "./movieModal.css";

const MovieModal = ({ movie, onClose }) => {
  const [isLoaded, setIsLoaded] = useState(false); // Track if the image is loaded

  if (!movie) return null;

  const { title, poster_path, release_date, overview, vote_average } = movie;
  const posterUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <div className="modal-image-wrapper">
          <img
            src={posterUrl}
            alt={title}
            onLoad={() => setIsLoaded(true)} // Set the image as loaded when it's fully loaded
            style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }} // Fade in the image
          />
          {!isLoaded && <div className="image-placeholder">Loading...</div>} {/* Show a loading placeholder */}
        </div>
        <div className="modal-info">
          <h2>{title}</h2>
          <p><strong>Release Date:</strong> {release_date}</p>
          <p><strong>Rating:</strong> {vote_average}</p>
          <p>{overview}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
