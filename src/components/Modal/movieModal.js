import React from 'react';
import "./movieModal.css";

const MovieModal = ({ movie, onClose }) => {
  if (!movie) return null;

  const { title, poster_path, release_date, overview, vote_average } = movie;
  const posterUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <img src={posterUrl} alt={title} />
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
