import { useRoutes } from 'react-router-dom';
import './App.css';
import Router from './routes/Routers.js';
import { ToastContainer} from 'react-toastify';
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
