import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartContainer from './components/CartContainer'

function App() {

  return (
    <>
     <header>
      <Navbar/>
      </header>
      <main>
        <CartContainer/>
      </main>
      <footer>
        <Footer/>
      </footer>
    </>
  )
}

export default App
