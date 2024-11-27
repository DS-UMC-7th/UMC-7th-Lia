/*import { createSlice } from '@reduxjs/toolkit';
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

export default cartSlice.reducer;*/

import { create } from 'zustand';
import cartItems from '../../constants/cartItems';

const useCartStore = create((set, get) => ({
  cartItems: cartItems, // 초기 장바구니 항목
  amount: 0, // 초기 총 수량
  total: 0, // 초기 총 가격

  // 액션 정의
  increase: (id) => {
    set((state) => {
      const updatedItems = state.cartItems.map((item) => {
        if (item.id === id) {
          return { ...item, amount: item.amount + 1 };
        }
        return item;
      });
      return { cartItems: updatedItems };
    });
  },

  decrease: (id) => {
    set((state) => {
      const updatedItems = state.cartItems.map((item) => {
        if (item.id === id && item.amount > 0) {
          return { ...item, amount: item.amount - 1 };
        }
        return item;
      });
      return { cartItems: updatedItems };
    });
  },

  removeItem: (id) => {
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== id),
    }));
  },

  clearCart: () => {
    set({ cartItems: [] });
  },

  calculateTotals: () => {
    set((state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      return { amount, total };
    });
  },
}));

export default useCartStore;
