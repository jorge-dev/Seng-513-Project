import {useContext} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import NavBar from './components/Demo/Navbar';
import ScrollToTop from './components/Demo/ScrollToTop';
import {ContextStore} from './ContextStore';
import CartPage from './pages/Demo/CartPage';
import HomePage from './pages/Demo/HomePage';
import ProductPage from './pages/Demo/ProductPage';
import Login from './pages/Login'
import CreateAccount from './pages/CreateAccount'
import AccountManagement from './pages/AccountManagement'
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Collection from './pages/Collection';

function App() {
  const {state} = useContext(ContextStore)
  const {cart} = state
  return (
      <BrowserRouter>
        <ScrollToTop/>
        <ToastContainer
            position="bottom-center"
            // autoClose={2500}
            // hideProgressBar={false}
            // newestOnTop={false}
            // closeOnClick
            // rtl={false}
            // pauseOnFocusLoss
            // draggable
            pauseOnHover
            limit={1}
        />
        <div className=''>
          <NavBar cart={cart}/>
          <main className="d-flex flex-column min-vh-100">
            <Routes>
              <Route path="/collections/:slug1/:slug2" element={<Collection />}/>
              <Route path="/product/slug/:slug" element={<ProductPage/>}/>
              <Route path="/" element={<HomePage/>}/>
              <Route path="/shoppingCart" element={<CartPage/>}/>

              <Route path="pages/Login" element={<Login/>}/>
              <Route path="pages/CreateAccount" element={<CreateAccount/>}/>
              <Route path="pages/AccountManagement" element={<AccountManagement/>}/>
            </Routes>

          </main>
          <footer className='footer mt-4'>
            <div className="text-center">All rights reserved &copy; 2020</div>
            <div className="text-center"> Designed and implemented by: Ahmed Elnasri,Haotian Chen, Daryl Dang
              , and Jorge Avila
            </div>
            <div className="text-center">All images are from the public domain and obtained from this websites: <br/>
              <div className="h5">
                <a href="https://oneofzero.net/">OneOfZero</a> {' '}
                <a href="https://www.razer.com/ca-en/">Razer</a> {' '}
                <a href="https://www.logitech.com/">Logitech</a>
              </div>


            </div>
          </footer>


        </div>

    </BrowserRouter >
  );
}

export default App;
