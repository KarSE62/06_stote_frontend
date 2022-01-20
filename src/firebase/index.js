// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrkM-4Lxx9wm06Nob2L_m5f8hh_MyObbs",
  authDomain: "fir-react-upload-d1358.firebaseapp.com",
  projectId: "fir-react-upload-d1358",
  storageBucket: "fir-react-upload-d1358.appspot.com",
  messagingSenderId: "976266756613",
  appId: "1:976266756613:web:712d5b02e13bb18626526c",
  measurementId: "G-D7MDLZ1YRZ"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);

//export storage
const storage = getStorage();
export { storage , firebase as default};