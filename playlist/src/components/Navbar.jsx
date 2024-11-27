import styled from "styled-components";
import StyledCartIcon from "../constants/StyledCartIcon";
import { useSelector } from "react-redux";
import { HiOutlineShoppingBag } from "react-icons/hi";

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
  align-items: flex-start; /* 아이템을 상단 정렬 */

`;

const CartAmount = styled.p`
  font-size: 12px;
  font-weight: bold;
  color: white;
  background-color: #ff6b6b;
  padding: 5px 10px;
  border-radius: 50px;
  margin-top: -9px; /* 위쪽으로 살짝 띄움 */
`;


const Navbar = () => {
  const { amount } = useSelector((state) => state.cart);

  return (
    <Nav>
      <NavContainer>
        <Logo>REAL DATA UMC PlayList</Logo>
        <CartContainer>
          <HiOutlineShoppingBag  size="40" color="white"/>
          <CartAmount>{amount}</CartAmount>
        </CartContainer>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;
