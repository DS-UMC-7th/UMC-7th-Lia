import {createSlice} from '@reduxjs/toolkit'
import cartItems from '../../constants/cartItems'

const initialState = {
    cartItems: cartItems,
    amount: 0,
    total:0,
}

const createSlice = ({
    name:'cart',
    initialState,
    reducers: {
        increase: (state, { payload }) => {
            // 내가 클릭한 항목의 id를 비교해서 같은 항목을 찾아냄.
            const itemId = payload;
            const item = state.cartItems.find((cartItem) => cartItem.id === itemId);
            // 내가 클릭한 항목이 무엇인지 찾았으니, 개수 증가시키기
            item.amount += 1;
          },
        decrease: (state, { payload }) => {
            // 내가 클릭한 항목의 id를 비교해서 같은 항목을 찾아냄.
            const itemId = payload;
            const item = state.cartItems.find((cartItem) => cartItem.id === itemId);
            // 내가 클릭한 항목이 무엇인지 찾았으니, 개수 감소시키기
            item.amount -= 1;
          },
          // TODO: 아이템 제거
        removeItem:(state,{payload})=>{
            const itemId = payload
            state.cartItems = state.cartItems.filter((item)=>item.id !== itemId)
        },
        
          // TODO: 모든 아이템 초기화 (clear)
          clearCart:(state)=>{
            state.cartItems=[];
          },
          // TODO: TOTAL을 계산. SUM(각각의 아이템 * 수량)

    }
})


export const {increase,decrease,removeItem,clearCart} =cartsSlice.actions
export default createSlice.reducers