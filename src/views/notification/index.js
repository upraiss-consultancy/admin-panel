// import { initializeApp } from "firebase/app";

// import { getMessaging } from "firebase/messaging";

// Firebase Config values imported from .env file
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_APP_API_KEY,
//   authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_APP_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_APP_APP_ID,
//   measurementId: import.meta.env.VITE_APP_MEASUREMENT_ID,
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

// Messaging service
// export const messaging = getMessaging(app);

// import { getToken } from "firebase/messaging";
// import { messaging } from "./firebase/firebaseConfig";

// const { VITE_APP_VAPID_KEY } = import.meta.env;

//   async function requestPermission() {
//     requesting permission using Notification API
//     const permission = await Notification.requestPermission();

//     if (permission === "granted") {
//       const token = await getToken(messaging, {
//         vapidKey: VITE_APP_VAPID_KEY,
//       });

//       We can send token to server
//       console.log("Token generated : ", token);
//     } else if (permission === "denied") {
//       notifications are blocked
//       alert("You denied for the notification");
//     }
//   }

//   useEffect(() => {
//     requestPermission();
//   }, []);


// import { toast, ToastContainer } from "react-toastify";
// import Message from "./components/Message";
// import "react-toastify/dist/ReactToastify.css";

// function App() {

//   onMessage(messaging, (payload) => {
//     toast(<Message notification={payload.notification} />);
//   });

//  ... Rest of the code ...
// return (
//     <>
//       // ... Rest of the code ...
//       <ToastContainer />
//     </>
//   );
// }


// const Message = ({ notification }) => {
//     return (
//       <>
//         <div id="notificationHeader">
//           image is optional
//           {notification.image && (
//             <div id="imageContainer">
//               <img src={notification.image} width={100} />
//             </div>
//           )}
//           <span>{notification.title}</span>
//         </div>
//         <div id="notificationBody">{notification.body}</div>
//       </>
//     );
//   };
  
//   export default Message;
//   You can configure the styl

// importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
// importScripts(
//   "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
// );

// Initialize the Firebase app in the service worker
// "Default" Firebase configuration (prevents errors)
// const defaultConfig = {
//   apiKey: true,
//   projectId: true,
//   messagingSenderId: true,
//   appId: true,
// };

// firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
// const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: payload.notification.image,
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });