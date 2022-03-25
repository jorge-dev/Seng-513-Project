import logo from './logo.svg';
import './App.css';
import Login from './pages/Login'
import CreateAccount from './pages/CreateAccount'
import {Routes, Route} from 'react-router-dom';

function App() {
  return (
  <Routes>
    <Route path="" element={<Login/>}/>
    <Route path="pages/CreateAccount" element={<CreateAccount/>}/>
    <Route path="*" element={<h2>Error - page not found</h2>}/>
  </Routes>
  );
}

export default App;
