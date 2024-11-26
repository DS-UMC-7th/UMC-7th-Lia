import styled from "styled-components";
import { useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";

// 스타일 컴포넌트 정의
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;

const Button = styled.button`
  background-color: ${(props) => (props.confirm ? "#007bff" : "#ff4d4f")};
  color: white;
  font-size: 14px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.confirm ? "#0056b3" : "#e43e3f")};
  }
`;

const ModalButton = () => {
  const dispatch = useDispatch();

  return (
    <ButtonContainer>
      <Button
        confirm
        onClick={() => {
          dispatch(clearCart());
        }}
      >
        네
      </Button>
      <Button
        onClick={() => {
          // 아니오 버튼 클릭 시 추가 동작
        }}
      >
        아니오
      </Button>
    </ButtonContainer>
  );
};

export default ModalButton;
