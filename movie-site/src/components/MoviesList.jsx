import React from 'react';
import { MOVIES } from '../mocks/movies';
import styled from 'styled-components';

const MoviesGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  gap: 15px;
  padding: 20px;
  list-style: none;
 
`;


const MovieContainer = styled.li`
  display: flex;
  flex-direction: column; 
  position: relative;
  width: 100%;
`;

const MoviePoster = styled.img`
  width: 100%;
 
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;

  ${MovieContainer}:hover & {
    opacity: 1;
  }
`;

const MoviesList = () => {

  return (
    <MoviesGrid>
      {MOVIES.results.map(movie => (
        <MovieContainer key={movie.id}>
          <MoviePoster 
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
            alt={movie.title} 
          />
          <Overlay>
            <p>{movie.title}</p>
          </Overlay>
        </MovieContainer>
      ))}
    </MoviesGrid>
  );
};

export default MoviesList;
