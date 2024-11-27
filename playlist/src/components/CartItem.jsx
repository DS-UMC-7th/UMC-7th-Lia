/*import styled from "styled-components";
import { useDispatch } from "react-redux";
import { increase, decrease, removeItem } from "../features/cart/cartSlice";
import { HiOutlineChevronUp, HiOutlineChevronDown } from "react-icons/hi";

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
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 5px;
`;

const Details = styled.div`
  flex: 1; 
  margin-left: 10px; 
  display: flex;
  flex-direction: column;
  margin-top:15px;
`;

const Title = styled.h4`
  font-size: 14px;
  color: #333;
  margin: 0;
`;

const Price = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #007bff;
  margin-top: 5px;
`;

const Controls = styled.div`
  display: flex;
  flex-direction: column; 
  align-items: center;
`;

const AmountButton = styled.button`
  background: none;
  border: none;
  color: #007bff;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Amount = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin: 5px 0;
`;

const CartItem = ({ id, title, singer, price, img, amount }) => {
  const dispatch = useDispatch();

  return (
    <Article>
   
      <Image src={img} alt={`${title} 이미지`} />

    
      <Details>
        <Title>{title} | {singer}</Title>
        <Price>₩ {price}</Price>
      </Details>

    
      <Controls>
        <AmountButton onClick={() => dispatch(increase(id))}>
          <HiOutlineChevronUp />
        </AmountButton>
        <Amount>{amount}</Amount>
        <AmountButton
          onClick={() => {
            if (amount === 1) {
              dispatch(removeItem(id));
              return;
            }
            dispatch(decrease(id));
          }}
        >
          <HiOutlineChevronDown />
        </AmountButton>
      </Controls>
    </Article>
  );
};

export default CartItem;*/

import styled from "styled-components";
import { HiOutlineChevronUp, HiOutlineChevronDown } from "react-icons/hi";
import useCartStore from "../features/cart/cartSlice";

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
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 5px;
`;

const Details = styled.div`
  flex: 1; /* 남은 공간을 차지하도록 설정 */
  margin-left: 10px; /* 이미지와 간격 */
  display: flex;
  flex-direction: column; /* 제목과 가격을 세로 정렬 */
  margin-top: 15px;
`;

const Title = styled.h4`
  font-size: 14px;
  color: #333;
  margin: 0;
`;

const Price = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #007bff;
  margin-top: 5px;
`;

const Controls = styled.div`
  display: flex;
  flex-direction: column; /* 버튼과 수량을 세로로 배치 */
  align-items: center;
`;

const AmountButton = styled.button`
  background: none;
  border: none;
  color: #007bff;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Amount = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin: 5px 0;
`;

const CartItem = ({ id, title, singer, price, img, amount }) => {
  const { increase, decrease, removeItem } = useCartStore();

  return (
    <Article>
      {/* 이미지 */}
      <Image src={img} alt={`${title} 이미지`} />

      {/* 제목과 가격 */}
      <Details>
        <Title>
          {title} | {singer}
        </Title>
        <Price>₩ {price}</Price>
      </Details>

      {/* 수량 조절 */}
      <Controls>
        <AmountButton onClick={() => increase(id)}>
          <HiOutlineChevronUp />
        </AmountButton>
        <Amount>{amount}</Amount>
        <AmountButton
          onClick={() => {
            if (amount === 1) {
              removeItem(id);
              return;
            }
            decrease(id);
          }}
        >
          <HiOutlineChevronDown />
        </AmountButton>
      </Controls>
    </Article>
  );
};

export default CartItem;
