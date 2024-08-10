import React from 'react';
import "./movieList.css";
import noImage from '../Assets/Images/no_image.jpg';

const MovieCard = ({ movie, onClick }) => {
  const { title, poster_path, release_date } = movie;
  const posterUrl = `https://image.tmdb.org/t/p/w200${poster_path}`;

  return (
    <div className="movie-card" onClick={() => onClick(movie)}>
      <img src={poster_path ? posterUrl : noImage} alt={title} />
      <div className="movie-info">
        <h3>{title}</h3>
        <p>{release_date.split('-')[0]}</p>
      </div>
    </div>
  );
};

export default MovieCard;