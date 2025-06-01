/*import {createSlice } from '@reduxjs/toolkit'

const initialState = {
    isOpen: false,
  };

const modalSlice = createSlice({
    name:'modal',
    initialState,
    reducers:{
        openModal:(state,action)=>{
            state.isOpen=true
        },
        closeModal:(state,action)=>{
            state.isOpen=false
        }
    }
})

export const {openModal,closeModal} = modalSlice.actions
export default modalSlice.reducer*/
import { create } from 'zustand';

const useModalStore = create((set) => ({
  isOpen: false, // 초기 상태

  // 모달 열기
  openModal: () => set({ isOpen: true }),

  // 모달 닫기
  closeModal: () => set({ isOpen: false }),
}));

export default useModalStore;
