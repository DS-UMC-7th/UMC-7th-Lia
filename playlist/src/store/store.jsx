import { configureStore } from "@reduxjs/toolkit";
import cartReducer from '../features/cart/cartSlice'
import modalReducer from '../features/modal/modalSlice'

const store = configureStore({
    reducer: {
      cart: cartReducer, // 'cart' 키에 reducer 연결,
      modal:modalReducer
    },
  });
  
export default store;