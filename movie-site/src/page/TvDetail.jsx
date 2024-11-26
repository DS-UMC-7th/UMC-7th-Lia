import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import InfoDetail from "../page/Tv/InfoDetailTv";
import CreditDetail from "../page/Tv/AggregateCredits";
import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList"; 

const Container = styled.div`
  margin: 0;
  padding: 10px;
  width: 100%;
  height: 100%;
  color: #ffffff;
  background-color: #000;
`;

const ReviewButton = styled.button`
margin-left:20px;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #c4006a;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom:10px;

  &:hover {
    background-color: #a0004d;
  }
`;

const TvDetail = () => {
  const [reviews, setReviews] = useState(() => {
    // 초기 상태를 로컬 스토리지에서 로드
    const savedReviews = localStorage.getItem("reviews");
    return savedReviews ? JSON.parse(savedReviews) : [];
  });

  const reviewListRef = useRef(null); // 리뷰 목록을 참조하는 ref

  const handleAddReview = (newReview) => {
    setReviews((prevReviews) => [...prevReviews, newReview]); // 리뷰 추가
  };

  const scrollToReviews = () => {
    // 리뷰 목록으로 스크롤
    reviewListRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // 상태가 변경될 때 로컬 스토리지에 저장
    localStorage.setItem("reviews", JSON.stringify(reviews));
  }, [reviews]);

  return (
    <Container>
       {/* 리뷰 보러가기 버튼 */}
       <ReviewButton onClick={scrollToReviews}>리뷰 보러가기</ReviewButton>
      <InfoDetail />
      <CreditDetail />

      {/* ReviewForm 컴포넌트 */}
      <ReviewForm onSubmit={handleAddReview} />

      {/* ReviewList 컴포넌트 */}
      <div ref={reviewListRef}>
        <ReviewList reviews={reviews} />
      </div>
    </Container>
  );
};

export default TvDetail;
