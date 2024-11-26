import styled from "styled-components";
import { CartIcon } from "../constants/icons"; 
import { useSelector } from "react-redux";

// 스타일 컴포넌트 정의
const Nav = styled.nav`
  background-color: #4c6ef5;
  padding: 10px 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled.h3`
  font-size: 24px;
  font-weight: bold;
  color: white;
`;

const CartContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CartAmount = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: white;
  background-color: #ff6b6b;
  padding: 5px 10px;
  border-radius: 50px;
`;





const Navbar = () => {
  const { amount } = useSelector((state) => state.cart);

  return (
    <Nav>
      <NavContainer>
        <Logo>REAL DATA UMC PlayList</Logo>
        <CartContainer>
          <CartIcon />
          <CartAmount>{amount}</CartAmount>
        </CartContainer>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;
