import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useRoutes } from 'react-router-dom';
import './App.css';
// import Dashboard from './dashboard/Dashboard';
// import Login from './Login';
// import UserManage from './Navbar/userDetails';
// import Loginform from './Authentication/Loginform/Loginform';
// import Otp from './Authentication/OTP/otp';
// import Frontpage from './Authentication/frontpage/frontpage';
// import Pagination from './components/pagination';
import components from './components/pagination'
import BookingForm from './components/form/form';
import { RegisterAdmin } from './Authentication/register/register';
import Router from './routes/Routers.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const routing = useRoutes(Router);
  return (
    <>
          {routing}
          <ToastContainer/>
    </>
  );
}

export default App;
