import { configureStore } from "@reduxjs/toolkit";
import cartReducer from '../features/cart/cartSlice'

const store = configureStore({
    reducer: {
      cart: cartReducer, // 'cart' 키에 reducer 연결
    },
  });
  
export default store;