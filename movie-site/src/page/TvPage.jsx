import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import todayImage from '../images/today.jpg';
import popularImage from '../images/popular.jpg';
import ratedImage from '../images/rated.jpg';
import ontheairImage from '../images/ontheair.jpg';

const TvPage = () => {
  const categories = [
    { title: "오늘 방영", image: todayImage, path: "airing-today" },
    { title: "인기있는", image: popularImage, path: "popular" },
    { title: "높은 평점", image: ratedImage, path: "top-rated" },
    { title: "tv 방영 중", image: ontheairImage, path: "on-the-air" }
  ];

  return (
    <Container>
      <Title>카테고리</Title>
      <CategoryGrid>
        {categories.map((category, index) => (
          <Link key={index} to={category.path}>
            <CategoryCard>
              <ImageWithLoader src={category.image} alt={category.title} />
              <CardTitle>{category.title}</CardTitle>
            </CategoryCard>
          </Link>
        ))}
      </CategoryGrid>
    </Container>
  );
};

const ImageWithLoader = ({ src, alt }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <ImageWrapper>
      <CardImage
        src={src}
        alt={alt}
        isLoaded={isLoaded}
        onLoad={() => setIsLoaded(true)}
      />
    </ImageWrapper>
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
  text-decoration: none;

  &:hover {
    background-color: #555;
    transform: scale(1.05);
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const CardImage = styled.img.withConfig({
  shouldForwardProp: (prop) => prop !== "isLoaded",
})`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${(props) => (props.isLoaded ? 1 : 0)}; // 로드 여부에 따라 불투명도 조정
  transition: opacity 0.5s ease-in-out;
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

export default TvPage;
