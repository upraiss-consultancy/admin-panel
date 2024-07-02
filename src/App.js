import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Dashboard from './Dashboard';
import UserManage from './Navbar/userDetails';
import Loginform from './Authentication/Loginform/Loginform';
import Otp from './Authentication/OTP/otp';
import Frontpage from './Authentication/frontpage/frontpage';
// import Pagination from './components/pagination';
import components from './components/pagination'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/data" element={<UserManage />} />
          <Route path="/login" element={<Loginform />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/frontpage" element={<Frontpage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
