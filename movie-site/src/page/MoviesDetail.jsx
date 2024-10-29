import styled from "styled-components";
import InfoDetail from "./InfoDetail";
import CreditDetail from "./CreditDetail";

const Container = styled.div`
  margin: 0;
  padding: 20px;
  width: 100%;
  height: 100%;
  color: #ffffff;
  background-color: #000; /* 배경색 추가 */
`;

const MoviesDetail = () => {
  return (
    <Container>
      <InfoDetail/>
      <CreditDetail/>
    </Container>
  );
};

export default MoviesDetail;