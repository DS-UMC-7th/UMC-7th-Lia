import React, { useState } from "react";
import styled from "styled-components";

const ReviewFormContainer = styled.form`
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 10px;
  background-color: #1a1a1a;
  color: #ffffff;

   h3 {
    margin-bottom: 20px; 
  }

  textarea {
    width: 100%;
    height: 100px;
    margin-bottom: 15px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #333333;
    background-color: #1a1a1a;
    color: #ffffff;
    resize: none;

    &:focus {
      outline: none;
      border-color: #c4006a;
      box-shadow: 0px 0px 8px rgba(196, 0, 106, 0.5);
    }
  }

  select {
    width: 100%;
    margin-bottom: 15px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #333333;
    background-color: #1a1a1a;
    color: #ffffff;

    &:focus {
      outline: none;
      border-color: #c4006a;
      box-shadow: 0px 0px 8px rgba(196, 0, 106, 0.5);
    }
  }
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background: linear-gradient(145deg, #c4006a, #940046);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(145deg, #940046, #c4006a);
    transform: translateY(-2px);
    box-shadow: 0px 8px 15px rgba(196, 0, 106, 0.5);
  }

  &:active {
    transform: translateY(2px);
    box-shadow: none;
  }
`;

const ReviewForm = ({ onSubmit }) => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (reviewText.trim() === "" || rating <= 0) {
      alert("리뷰와 별점을 모두 입력해주세요!");
      return;
    }

    onSubmit({ review: reviewText, rating }); // 부모 컴포넌트로 데이터 전달
    setReviewText(""); // 입력 필드 초기화
    setRating(0); // 별점 초기화
  };

  return (
    <ReviewFormContainer onSubmit={handleSubmit}>
      <h3>리뷰 작성</h3>
      <textarea
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        placeholder="리뷰를 작성해주세요."
      />
      <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
        <option value={0}>별점 선택</option>
        {[1, 2, 3, 4, 5].map((star) => (
          <option key={star} value={star}>
            {star}
          </option>
        ))}
      </select>
      <SubmitButton type="submit">리뷰 남기기</SubmitButton>
    </ReviewFormContainer>
  );
};

export default ReviewForm;

