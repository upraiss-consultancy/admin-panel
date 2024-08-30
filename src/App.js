import { useRoutes } from 'react-router-dom';
import './App.css';
import Router from './routes/Routers.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { generateToken , messaging} from './views/notification/index.js';
import { useEffect } from 'react';
import { onMessage } from 'firebase/messaging';
import showToast from './utils/toast.js';
function App() {
  const routing = useRoutes(Router);
  useEffect(() => {
    generateToken()
    onMessage(messaging, (payload) => {
      showToast(payload.notification.body , 'success');
      console.log(payload , "payload")
    })
  }, [])
  return (
    <>
      {routing}
      <ToastContainer />
    </>
  );
}

export default App;
