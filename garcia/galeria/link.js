// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmSGZt2q7pEK8QYq8vD7r13tcHanVEPJ8",
  authDomain: "galeria-oficial.firebaseapp.com",
  projectId: "galeria-oficial",
  storageBucket: "galeria-oficial.firebasestorage.app",
  messagingSenderId: "131213089591",
  appId: "1:131213089591:web:5577f79df2f3aac67758b2",
  measurementId: "G-WPH53JL39R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);