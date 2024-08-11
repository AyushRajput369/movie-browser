import React, { useState } from 'react';
import "./movieList.css";
import noImage from '../Assets/Images/no_image.jpg';

const MovieCard = ({ movie, onClick }) => {
  const { title, poster_path, release_date } = movie;
  const posterUrl = `https://image.tmdb.org/t/p/w200${poster_path}`;
  
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="movie-card" onClick={() => onClick(movie)}>
      <div className="image-wrapper">
        <img
          src={poster_path ? posterUrl : noImage}
          alt={title}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}
        />
        {!isLoaded && <div className="image-placeholder">Loading...</div>}
      </div>
      <div className="movie-info">
        <h3>{title}</h3>
        <p>{release_date.split('-')[0]}</p>
      </div>
    </div>
  );
};

export default MovieCard;