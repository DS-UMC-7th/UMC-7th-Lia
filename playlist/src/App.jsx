/*import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartContainer from './components/CartContainer'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { calculateTotals } from './features/cart/cartSlice'
import ModalPotal from './components/ModalPortal'
import Modal from './components/Modal'

function App() {
  const dispatch=useDispatch()
  const {cartItems} = useSelector((store)=>store.cart)
  const {isOpen} = useSelector((store)=>store.modal)

  useEffect(()=>{
    dispatch(calculateTotals())
  },[cartItems,dispatch])

  return (
    <>
     <header>
      <Navbar/>
      </header>
      <main>
        <CartContainer/>
        {isOpen&&<ModalPotal>
          <Modal>
            <h4>담아두신 모든 음반을 삭제하시겠습니까?</h4>
          </Modal>
        </ModalPotal>}
      </main>
      <footer>
        <Footer/>
      </footer>
    </>
  )
}

export default App;*/

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartContainer from './components/CartContainer';
import { useEffect } from 'react';
import ModalPortal from './components/ModalPortal';
import Modal from './components/Modal';
import useCartStore from './features/cart/cartSlice'; // Zustand 장바구니 훅
import useModalStore from './features/modal/modalSlice'; // Zustand 모달 훅

function App() {
  const { cartItems, calculateTotals } = useCartStore();
  const { isOpen } = useModalStore();

  useEffect(() => {
    calculateTotals(); // Zustand 메서드 호출
  }, [cartItems, calculateTotals]);

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <CartContainer />
        {isOpen && (
          <ModalPortal>
            <Modal>
              <h4>담아두신 모든 음반을 삭제하시겠습니까?</h4>
            </Modal>
          </ModalPortal>
        )}
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
