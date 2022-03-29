import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/Demo/Navbar';
import HomePage from './pages/Demo/HomePage';
import ProductPage from './pages/Demo/ProductPage';

function App() {
  return (
    <BrowserRouter>
      <div className='d-flex flex-column vh-100'>
        <NavBar />
        <main>
          <Routes>
            <Route path="/product/:slug" element={<ProductPage />} />
            <Route path="/" element={<HomePage />} />

          </Routes>

        </main>
        <footer className='footer'>
          <div class="text-center">All rights reserved &copy; 2020</div>
          <div class="text-center">  Designed and implemented by:  Ahmed Elnasri,Haotian Chen, Daryl Dang
            , and Jorge Avila
          </div>
          <div class="text-center">Ahmed Elnasri,Haotian Chen, Daryl Dang,
            , and Jorge Avila
          </div>
        </footer>


      </div >

    </BrowserRouter >
  );
}

export default App;
