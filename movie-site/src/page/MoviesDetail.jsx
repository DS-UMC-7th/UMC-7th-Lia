import React, { useState } from "react";
import styled from "styled-components";
import InfoDetail from "./InfoDetail";
import CreditDetail from "./CreditDetail";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList"; // ReviewList 가져오기

const Container = styled.div`
  margin: 0;
  padding: 20px;
  width: 100%;
  height: 100%;
  color: #ffffff;
  background-color: #000;
`;

const MoviesDetail = () => {
  const [reviews, setReviews] = useState([
    { review: "정말 재미있었어요!", rating: 5 },
    { review: "생각보다 별로였어요.", rating: 2 },
  ]);

  const handleAddReview = (newReview) => {
    setReviews((prevReviews) => [...prevReviews, newReview]); // 리뷰 추가
  };

  return (
    <Container>
      <InfoDetail />
      <CreditDetail />

      {/* ReviewForm 컴포넌트 */}
      <ReviewForm onSubmit={handleAddReview} />

      {/* ReviewList 컴포넌트 */}
      <ReviewList reviews={reviews} />
    </Container>
  );
};

export default MoviesDetail;
