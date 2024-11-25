import React from "react";
import styled from "styled-components";

const ReviewContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  border-radius: 10px;
  background-color: #1a1a1a;
  color: #ffffff;

   h3 {
    margin-bottom: 20px; 
  }

`;

const Review = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #333333;
  border-radius: 10px;
  background: linear-gradient(145deg, #292929, #1c1c1c);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.6);
`;

const Rating = styled.div`
  font-weight: bold;
  font-size: 16px;
  color: #ffd700;
  margin-bottom: 10px;
`;

const Comment = styled.div`
  font-size: 14px;
  color: #e0e0e0;
`;

const ReviewList = ({ reviews }) => {
  return (
    <ReviewContainer>
      <h3>리뷰 목록</h3>
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <Review key={index}>
            <Rating>{"⭐".repeat(review.rating)} ({review.rating}/5)</Rating>
            <Comment>{review.review}</Comment>
          </Review>
        ))
      ) : (
        <p>아직 작성된 리뷰가 없습니다. 첫 번째 리뷰를 작성해주세요!</p>
      )}
    </ReviewContainer>
  );
};

export default ReviewList;
