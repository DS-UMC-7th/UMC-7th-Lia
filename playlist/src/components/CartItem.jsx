import { useDispatch } from "react-redux";
import { ChevronDown, ChevronUp } from "../constants/icons";
import { increase,decrease } from "../features/cart/cartSlice";

const CartItem = ({ id, title, singer, price, img, amount }) => {
  const dispatch = useDispatch();

  return (
    <article className="cart-item">
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
        <button className="amount-btn" onClick={() => dispatch(decrease(id))}>
          <ChevronDown />
        </button>
      </div>
    </article>
  );
};

export default CartItem;

