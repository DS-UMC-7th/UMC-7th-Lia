import styled from "styled-components";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";

// 스타일 컴포넌트 정의
const Section = styled.section`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;

`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 20px;

  h2 {
    font-size: 24px;
    color: #333;
  }
`;

const Footer = styled.footer`
  text-align: center;
  margin-top: 20px;

  hr {
    border: none;
    border-top: 1px solid #ccc;
    margin: 20px 0;
  }

  .cart-total h4 {
    font-size: 18px;
    font-weight: bold;
    color: #333;

    span {
      color: #007bff;
    }
  }

  .clear-btn {
    background-color: #ff4d4f;
    color: white;
    font-size: 16px;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #e43e3f;
    }
  }
`;

const CartContainer = () => {
  const { cartItems, total } = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  return (
    <Section>
      <Header>
        <h2>당신이 선택한 음반</h2>
      </Header>
      <div>
        {cartItems.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>
      <Footer>
        <hr />
        <div className="cart-total">
          <h4>
            총 가격 <span>₩ {total}원</span>
          </h4>
        </div>
        <button
          className="clear-btn"
          onClick={() => {
            dispatch(clearCart());
          }}
        >
          장바구니 초기화
        </button>
      </Footer>
    </Section>
  );
};

export default CartContainer;
