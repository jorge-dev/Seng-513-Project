import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/Demo/Navbar';
import HomePage from './pages/Demo/HomePage';
import ProductPage from './pages/Demo/ProductPage';

import Login from './pages/Login'
import CreateAccount from './pages/CreateAccount'
import AccountManagement from './pages/AccountManagement'

function App() {
  return (
    <BrowserRouter>
      <div className='d-flex flex-column vh-100'>
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:slug" element={<ProductPage />} />
            <Route path="pages/Login" element={<Login />}/>
            <Route path="pages/CreateAccount" element={<CreateAccount/>}/>
            <Route path="pages/AccountManagement" element={<AccountManagement/>}/>
          </Routes>

        </main>
        <footer className='footer'>
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
