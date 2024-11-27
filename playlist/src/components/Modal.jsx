import styled from "styled-components";
import ModalButton from "./ModalButton";

const Backdrop = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  width: 90%;
  max-width: 400px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Modal = ({ children }) => {
  return (
    <Backdrop>
      <ModalContent>
        {children}
        <ModalButton />
      </ModalContent>
    </Backdrop>
  );
};

export default Modal;
