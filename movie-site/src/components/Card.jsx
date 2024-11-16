import React from 'react';
import { MOVIES } from '../mocks/movies';
import styled from 'styled-components';

const Card = () => {

  return (
    <MoviesGrid>
      {MOVIES.results.map(movie => (
        <MovieContainer key={movie.id}>
          <MovieItem onClick={() => handleMovieClick(movie.id)}>
          <MoviePoster 
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
            alt={movie.title} 
          />
          <Overlay />
          </MovieItem>
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

const MovieItem = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  width: 100%;
  color: white;
  cursor: pointer; /* 클릭 가능한 요소로 표시 */
  &:hover {
    transition: transform 0.2s ease-in-out;
  }
  &:hover > div {
    opacity: 1; /* hover 시 overlay를 보이게 함 */
  }
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
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 10px;
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
  width: 140px;
  height: 210px; 
  object-fit: cover;
  border-radius: 8px;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.2s ease-in-out; 
`;


export default Card;
