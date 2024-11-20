import React from "react";
import styled from "styled-components";
import ReviewSection from "../components/ReviewSection";
import { useParams } from "react-router-dom";

const Container = styled.div`
  margin: 0;
  padding: 20px;
  width: 100%;
  height: 100%;
  color: #ffffff;
  background-color: #000; /* 배경색 추가 */
`;

const ReviewForm = () => {
  const { movieId } = useParams(); 

  return (
    <Container>
      <h2>리뷰 작성</h2>
      <ReviewSection movieId={movieId} />
    </Container>
  );
};

export default ReviewForm;
