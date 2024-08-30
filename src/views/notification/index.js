// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC-wVAgRJqhsxGZgLZjCoLmcW8JBVMFZPo",
    authDomain: "driveassist-f3067.firebaseapp.com",
    projectId: "driveassist-f3067",
    storageBucket: "driveassist-f3067.appspot.com",
    messagingSenderId: "381124830666",
    appId: "1:381124830666:web:c5927b4ce050d3a901db33",
    measurementId: "G-PFP0PFC9LP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const messaging = getMessaging(app);

export const generateToken = async () => {
    const permission = await Notification.requestPermission();
    console.log(permission, "permission")
    if(permission === 'granted') {

        const token = await getToken(messaging, {
            vapidKey: 'BJ_M7TJXEH5I2KWrG2OWMFt9DtV1LfzmAxfv_JUhaKdZn-uQaKLAflX2-j-j1MC7nx0Yc05Ee1LbLfPAzwKa79w'
        });
        console.log(token , 'token')
    }
}