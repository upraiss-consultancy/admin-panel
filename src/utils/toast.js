import { toast } from "react-toastify";
const successToast = (message) => {
    toast.success(
      <div>
        {/* <img src={successImage} alt="Success" style={{ width: '20px', marginRight: '8px' }} /> */}
        {message}
      </div>,
      {
        position: "top-center",
        autoClose: 3000, // Close the toast after 3 seconds
      }
    );
  };

  const errorToast = (message) => {
    toast.error(
      <div>
        {message}
      </div>,
      {
        position:"top-center",
        autoClose: 3000, // Close the toast after 3 seconds
      }
    );
  };

  export default {
    successToast,
    errorToast
  }