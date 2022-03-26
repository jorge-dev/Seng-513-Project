import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Login from './pages/Login'
import CreateAccount from './pages/CreateAccount'
import AccountManagement from './pages/AccountManagement'

function App() {
  return (
  <BrowserRouter>
  <Routes>
    <Route path="" element={<Login/>}/>
    <Route path="pages/CreateAccount" element={<CreateAccount/>}/>
    <Route path="pages/AccountManagement" element={<AccountManagement/>}/>
    <Route path="*" element={<h2>Error - page not found</h2>}/>
  </Routes>
  </BrowserRouter>
  );
}

export default App;
