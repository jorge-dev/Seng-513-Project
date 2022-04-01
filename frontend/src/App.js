import { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/Demo/Navbar';
import ScrollToTop from './components/Demo/ScrollToTop';
import { ContextStore } from './ContextStore';
import CartPage from './pages/Demo/CartPage';
import HomePage from './pages/Demo/HomePage';
import ProductPage from './pages/Demo/ProductPage';

import Login from './pages/Login'
import CreateAccount from './pages/CreateAccount'
import AccountManagement from './pages/AccountManagement'

function App() {
  const { state } = useContext(ContextStore)
  const { cart } = state
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className=''>
        <NavBar cart={cart} />
        <main className="d-flex flex-column min-vh-100">
          <Routes>
            <Route path="/product/slug/:slug" element={<ProductPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/shoppingCart" element={<CartPage />} />

            <Route path="pages/Login" element={<Login />}/>
            <Route path="pages/CreateAccount" element={<CreateAccount/>}/>
            <Route path="pages/AccountManagement" element={<AccountManagement/>}/>
          </Routes>

        </main>
        <footer className='footer mt-4'>
          <div className="text-center">All rights reserved &copy; 2020</div>
          <div className="text-center">  Designed and implemented by:  Ahmed Elnasri,Haotian Chen, Daryl Dang
            , and Jorge Avila
          </div>
          <div className="text-center">Ahmed Elnasri,Haotian Chen, Daryl Dang,
            , and Jorge Avila
          </div>
        </footer>


      </div >

    </BrowserRouter >
  );
}

export default App;
