import React, { useState } from "react";
import styled from "styled-components";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../apis/axios-instance-detail"; // axios 인스턴스 불러오기

const ReviewSection = ({ movieId }) => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  // 리뷰 목록 가져오기
  const { data: reviews, refetch } = useQuery({
    queryKey: ["reviews", movieId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/movies/${movieId}/reviews`);
      return response.data;
    },
  });

  // 리뷰 작성
  const { mutate: addReview, isLoading } = useMutation({
    mutationFn: async (newReview) => {
      await axiosInstance.post(`/movies/${movieId}/reviews`, newReview);
    },
    onSuccess: () => {
      refetch(); // 리뷰 목록 새로고침
      setReview(""); // 리뷰 입력 필드 초기화
      setRating(0); // 별점 초기화
      alert("리뷰가 성공적으로 추가되었습니다!");
      navigate(`/movies/${movieId}`); // 영화 상세 페이지로 이동
    },
    onError: (error) => {
      console.error("리뷰 추가 실패:", error);
      alert("리뷰를 추가하는 중 오류가 발생했습니다. 다시 시도해주세요."); // 오류 알림
    },
  });

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (review.trim() === "" || rating <= 0) {
      alert("리뷰와 별점을 모두 입력해주세요!");
      return;
    }
    addReview({ review, rating }); // 리뷰 추가
  };

  return (
    <ReviewContainer>
      <h3>리뷰</h3>
      {reviews && reviews.length > 0 ? (
        reviews.map((r, index) => (
          <Review key={index}>
            <Rating>⭐ {r.rating}/5</Rating>
            <Comment>{r.review}</Comment>
          </Review>
        ))
      ) : (
        <p>리뷰가 아직 없습니다. 첫 번째 리뷰를 작성해보세요!</p>
      )}

      <ReviewForm onSubmit={handleSubmitReview}>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
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
        <SubmitButton type="submit" disabled={isLoading}>
          {isLoading ? "리뷰 작성 중..." : "리뷰 남기기"}
        </SubmitButton>
      </ReviewForm>
    </ReviewContainer>
  );
};

// 스타일링
const ReviewContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  border-radius: 10px;
  background-color: #1a1a1a; /* 어두운 배경색 */
  color: #ffffff;
`;

const Review = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #333333;
  border-radius: 10px;
  background: linear-gradient(145deg, #292929, #1c1c1c); /* 그라데이션 효과 */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.6);
`;

const Rating = styled.div`
  font-weight: bold;
  font-size: 16px;
  color: #ffd700; /* 별 색상: 골드 */
  margin-bottom: 10px;
`;

const Comment = styled.div`
  font-size: 14px;
  color: #e0e0e0; /* 연한 글씨 */
`;

const ReviewForm = styled.form`
  margin-top: 30px;

  textarea {
    width: 100%;
    height: 120px;
    margin-bottom: 15px;
    padding: 15px;
    border-radius: 10px;
    border: 1px solid #333333;
    background-color: #1a1a1a;
    color: #ffffff;
    resize: none;

    &:focus {
      outline: none;
      border-color: #c4006a; /* 포커스 시 강조 색상 */
      box-shadow: 0px 0px 8px rgba(196, 0, 106, 0.5);
    }
  }

  select {
    width: 100%;
    margin-bottom: 15px;
    padding: 10px;
    border-radius: 10px;
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
  padding: 12px 20px;
  background: linear-gradient(145deg, #c4006a, #940046); /* 그라데이션 버튼 */
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

export default ReviewSection;
