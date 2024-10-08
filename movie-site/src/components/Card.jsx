import React from 'react';
import { MOVIES } from '../mocks/movies';
import styled from 'styled-components';

const Card = () => {

  return (
    <MoviesGrid>
      {MOVIES.results.map(movie => (
        <MovieContainer key={movie.id}>
          <MoviePoster 
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
            alt={movie.title} 
          />
          <Content>
            <Title>{movie.title}</Title>
            <Date>{movie.release_date}</Date>
          </Content>
        </MovieContainer>
      ))}
    </MoviesGrid>

    
  );
};

const Content = styled.div`
    color: white; 
    padding: 10px; 
`;

const Title = styled.p`
    margin: 0; 
    font-size: 13px; 
`;

const Date = styled.p`
    margin: 0; 
    font-size: 10px; 
`;

const MoviesGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  gap: 15px;
  padding: 10px;
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


export default Card;
