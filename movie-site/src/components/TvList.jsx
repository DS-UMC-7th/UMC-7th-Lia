import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const TvList = ({ tvs }) => { 
  const navigate = useNavigate();

  const handleMovieClick = (series_id) => {
    navigate(`/tv/${series_id}`);
  };

  return (
    <MoviesGrid>
      {tvs.map(tv => (
        <MovieContainer key={tv.id}>
        <MovieItem onClick={() => handleMovieClick(tv.id)}>
          {tv.poster_path ? (
            <MoviePoster
              src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
              alt={tv.name || tv.title}
            />
          ) : (
            <NoImage>이미지 없음</NoImage>
          )}
          <Overlay />
        </MovieItem>
        <Content>
          <Title>{tv.name || tv.title}</Title>
          <Date>{tv.first_air_date || tv.release_date}</Date>
        </Content>
      </MovieContainer>
      ))}
    </MoviesGrid>
  );
};

const Content = styled.div`
  color: white;
  padding: 10px;
  height: 50px; 
  display: flex;
  flex-direction: column; 
  gap: 5px; 
  overflow: hidden; 
`;

const Title = styled.p`
  margin: 0;
  font-size: 13px;
  word-wrap: break-word; 
  max-width: 140px;
  max-height:20px;
  overflow: hidden; 
  text-overflow: ellipsis; 
`;

const Date = styled.p`
  margin: 0;
  font-size: 11px; 
  overflow: hidden; 
  text-overflow: ellipsis; 
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
  width: 140px; /* 고정된 가로 크기 */
  height: 210px; /* 고정된 세로 크기 */
  object-fit: cover; /* 크기 조정 방식 */
  border-radius: 8px; /* 선택적으로 모서리를 둥글게 */
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

const NoImage = styled.div`
  width: 140px;
  height: 210px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #333; 
  color: #fff; /* 텍스트 색상 */
  font-size: 12px;
  border-radius: 8px;
  text-align: center;
`;

export default TvList;
