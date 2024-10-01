import React from 'react';
import { MOVIES } from '../mocks/movies';
import './MoviesList.css'; 

const MoviesList = () => {
  return (
    <div>
      <h1>현재 상영 중인 영화</h1>
      <ul className="movies-grid">
        {MOVIES.results.map(movie => (
          <li key={movie.id} className="movie-item">
            <img 
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
              alt={movie.title} 
              className="movie-poster" 
            />
            <div className="overlay">
              <p>{movie.title}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoviesList;
