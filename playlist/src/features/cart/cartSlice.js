import { createSlice } from '@reduxjs/toolkit';
import cartItems from '../../constants/cartItems';

const initialState = {
  cartItems: cartItems, // 초기 장바구니 항목
  amount: 0, // 초기 총 수량
  total: 0, // 초기 총 가격
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increase: (state, { payload }) => {
      const item = state.cartItems.find((cartItem) => cartItem.id === payload);
      if (item) {
        item.amount += 1;
      }
    },
    decrease: (state, { payload }) => {
      const item = state.cartItems.find((cartItem) => cartItem.id === payload);
      if (item && item.amount > 0) {
        item.amount -= 1;
      }
    },
    removeItem: (state, { payload }) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== payload);
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
});

export const { increase, decrease, removeItem, clearCart, calculateTotals } =
  cartSlice.actions;

export default cartSlice.reducer;
