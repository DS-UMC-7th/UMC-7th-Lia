import React from 'react';
import styled from 'styled-components';
import { Link} from 'react-router-dom'; 

import currentImage from '../images/current.jpg';
import popularImage from '../images/popular.jpg';
import ratedImage from '../images/rated.jpg';
import upcomingImage from '../images/upcoming.jpg';


const MoviesPage = () => {
  const categories = [
    { title: "현재 상영중인", image: currentImage, path: "now-playing" },
    { title: "인기있는", image: popularImage, path: "popular" },
    { title: "높은 평가를 받은", image: ratedImage, path: "top-rated" },
    { title: "개봉 예정작", image: upcomingImage, path: "up-coming" }
  ];

  return (
    <Container>
      <Title>카테고리</Title>
      <CategoryGrid>
        {categories.map((category, index) => (
          <Link key={index} to={category.path}>
            <CategoryCard>
              <CardImage src={category.image} alt={category.title} />
              <CardTitle>{category.title}</CardTitle>
            </CategoryCard>
          </Link>
        ))}
      </CategoryGrid>
    </Container>
  );



  
};

const Title = styled.h1`
  color: white;
  margin-top: 5px; 
  padding: 5px;
`;

const Container = styled.div`
  color: white;
  padding: 5px;
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 10px;
  background-color: #000;
  color: white;
`;

const CategoryCard = styled.div`
  position: relative;
  background-color: #333;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  text-decoration: none; /* 링크의 기본 밑줄 제거 */

  &:hover {
    background-color: #555; 
    transform: scale(1.05);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CardTitle = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  color: white;
  font-size: 18px;
  background-color: rgba(0, 0, 0, 0.6); 
  padding: 5px 10px;
  border-radius: 5px;
`;

export default MoviesPage;
