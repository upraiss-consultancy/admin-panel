import { useRoutes } from 'react-router-dom';
import './App.css';
import Router from './routes/Routers.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { generateToken , messaging} from './views/notification/index.js';
import { useEffect } from 'react';
import { onMessage } from 'firebase/messaging';
import showToast from './utils/toast.js';
import { useLoading } from './context/loadingContext.js';
import Loader from './components/loader/loader.js';
import { useAxiosInterceptors } from './api/middlewares/protected-interceptor.js';
import { useAxiosInterceptor } from './api/middlewares/interceptor.js';
function App() {
  const routing = useRoutes(Router);
  const { loading } = useLoading();
  useAxiosInterceptors();
  useAxiosInterceptor()
  useEffect(() => {
    generateToken()
    onMessage(messaging, (payload) => {
      console.log(messaging , 'Payload' , payload)
      showToast(payload.notification.body , 'success');
    })
  }, [])
  return (
    <>
      {loading && <Loader />}
      {routing}
      <ToastContainer />
    </>
  );
}

export default App;
