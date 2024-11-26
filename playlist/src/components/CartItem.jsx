import styled from "styled-components";
import { useDispatch } from "react-redux";
import { ChevronDown, ChevronUp } from "../constants/icons";
import { increase, decrease, removeItem } from "../features/cart/cartSlice";

// 스타일 컴포넌트 정의
const Article = styled.article`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  img {
    width: 50px;
    height: 50px;
    border-radius: 5px;
  }

  h4 {
    font-size: 14px;
    color: #333;
    margin: 0;
  }

  .item-price {
    font-size: 16px;
    font-weight: bold;
    color: #007bff;
  }

  .amount-btn {
    background: none;
    border: none;
    color: #007bff;
    font-size: 18px;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }

  .amount {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    margin: 0 10px;
  }
`;

const CartItem = ({ id, title, singer, price, img, amount }) => {
  const dispatch = useDispatch();

  return (
    <Article>
      <img src={img} alt={`${title} 이미지`} />
      <div>
        <h4>
          {title} | {singer}
        </h4>
      </div>
      <h4 className="item-price">₩ {price}</h4>
      <div>
        <button
          className="amount-btn"
          onClick={() => dispatch(increase(id))}
        >
          <ChevronUp />
        </button>
        <p className="amount">{amount}</p>
        <button
          className="amount-btn"
          onClick={() => {
            if (amount === 1) {
              dispatch(removeItem(id));
              return;
            }
            dispatch(decrease(id));
          }}
        >
          <ChevronDown />
        </button>
      </div>
    </Article>
  );
};

export default CartItem;
