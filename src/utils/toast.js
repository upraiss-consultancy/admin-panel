// const function 
import { toast } from 'react-toastify';

const showToast = (message, type) => {
  toast(message, {
      type: type,
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
  });
}

export default showToast;