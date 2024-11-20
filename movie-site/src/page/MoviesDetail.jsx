import styled from "styled-components";
import InfoDetail from "./InfoDetail";
import CreditDetail from "./CreditDetail";
import { useNavigate, useParams } from "react-router-dom";

const Container = styled.div`
  margin: 0;
  padding: 20px;
  width: 100%;
  height: 100%;
  color: #ffffff;
  background-color: #000; /* 배경색 추가 */
`;

const ReviewButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #c4006a;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left:50px;

  &:hover {
    background-color: ${(props) =>
      props.color === "#c4006a" ? "#a0004d" : "#222"};
  }
`;

const MoviesDetail = () => {
  const navigate = useNavigate();
  const { movieId } = useParams(); // URL에서 movieId 가져오기

  const handleNavigateToReview = () => {
    navigate(`/movies/${movieId}/review`); // 리뷰 페이지로 이동
  };

  return (
    <Container>
       <ReviewButton onClick={handleNavigateToReview}>
        리뷰 작성하러 가기
      </ReviewButton>
      <InfoDetail />
      <CreditDetail />
    </Container>
  );
};

export default MoviesDetail;
