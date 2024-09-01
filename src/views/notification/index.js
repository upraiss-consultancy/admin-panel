// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB6x0_m2TjMHjh1U7i_Fhwdug5xSQOlTyU",
    authDomain: "upraiss-6be1e.firebaseapp.com",
    projectId: "upraiss-6be1e",
    storageBucket: "upraiss-6be1e.appspot.com",
    messagingSenderId: "824054677081",
    appId: "1:824054677081:web:4997c2b3f73edcd52cbb48",
    measurementId: "G-CT25SPT54E"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const messaging = getMessaging(app);

export const generateToken = async () => {
    const permission = await Notification.requestPermission();
    console.log(permission, "permission")
    if (permission === 'granted') {
        const token = await getToken(messaging, {
            vapidKey: 'BHSFvpTk9fAWRev_yer3Z_KSOA7D5deQCqcZYAGmmebC6W8vVqbT3vTitaSVZL4eOtCeBFrOJ7SYDLJ86tD2zr0'
        });
        localStorage.setItem('notificationToken', token)
    }
}