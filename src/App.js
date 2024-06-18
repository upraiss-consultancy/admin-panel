import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Dashboard from './Dashboard';
import UserManage from './Navbar/userDetails';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/data" element={<UserManage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
