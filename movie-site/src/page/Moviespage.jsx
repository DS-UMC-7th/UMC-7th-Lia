import React from 'react';
import styled from 'styled-components';

// 이미지 파일을 직접 import
import currentImage from '../images/current.jpg';
import popularImage from '../images/popular.jpg';
import ratedImage from '../images/rated.jpg';
import upcomingImage from '../images/upcoming.jpg';

// 카테고리 페이지의 제목 스타일
const Container = styled.div`
  color: white;
  padding: 5px;
`;

// 카테고리 그리드 스타일
const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 10px;
  background-color: #000;
  color: white;
`;

// 카테고리 카드 스타일
const CategoryCard = styled.div`
  position: relative;
  background-color: #333;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    background-color: #555; 
    transform: scale(1.05);
  }
`;

// 카드의 이미지가 꽉 차게 설정
const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// 텍스트를 카드의 왼쪽 하단에 배치
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

const Moviespage = () => {
  // 영화 카테고리 데이터 (이미지 import 포함)
  const categories = [
    { title: "현재 상영중인", image: currentImage },
    { title: "인기있는", image: popularImage },
    { title: "높은 평가를 받은", image: ratedImage },
    { title: "개봉 예정작", image: upcomingImage }
  ];

  return (
    <Container>
      <h1>카테고리</h1>
      <CategoryGrid>
        {categories.map((category, index) => (
          <CategoryCard key={index}>
            <CardImage src={category.image} alt={category.title} />
            <CardTitle>{category.title}</CardTitle>
          </CategoryCard>
        ))}
      </CategoryGrid>
    </Container>
  );
};

export default Moviespage;
