import React, { useEffect, useState } from 'react';
import MovieCard from './movieCard';
import MovieModal from './Modal/movieModal';
import "./movieList.css";

const MovieList = ({ movies }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [moviList, setMovieList] = useState([]);

  const handleCardClick = (movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  useEffect(()=>{
    setMovieList(movies)
  }, [movies]);

  return (
    <div className="movie-list-container">
      <div className="movie-grid">
        {moviList?.map(movie => (
          <MovieCard key={movie.id} movie={movie} onClick={handleCardClick} />
        ))}
      </div>
      {selectedMovie && <MovieModal movie={selectedMovie} onClose={closeModal} />}
    </div>
  );
};

export default MovieList;

