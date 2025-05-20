// <<<<<<< HEAD
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// =======
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
// >>>>>>> 2e1f35f52b2a593ee8e28fd63e3f5d45ce95f230

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

// <<<<<<< HEAD
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export { db };
// =======
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
// >>>>>>> 2e1f35f52b2a593ee8e28fd63e3f5d45ce95f230