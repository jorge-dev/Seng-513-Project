import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import LogoImage from "./logos/fullLogo.png";
import HomePage from './pages/Demo/HomePage';
import ProductPage from './pages/Demo/ProductPage';

function App() {
  return (
    <BrowserRouter>
      <div>
        <header>
          <Link to="/">
            <img src={LogoImage} width="150" alt="logo" />
          </Link>
        </header>
        <main>
          <Routes>
            <Route path="/product/:slug" element={<ProductPage />} />
            <Route path="/" element={<HomePage />} />

          </Routes>

        </main >
      </div >
    </BrowserRouter>
  );
}

export default App;
