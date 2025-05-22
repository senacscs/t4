// Importa tudo via CDN ESModules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-analytics.js";
import { getFirestore, collection, addDoc, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-firestore.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCmSGZt2q7pEK8QYq8vD7r13tcHanVEPJ8",
  authDomain: "galeria-oficial.firebaseapp.com",
  projectId: "galeria-oficial",
  storageBucket: "galeria-oficial.firebasestorage.app",
  messagingSenderId: "131213089591",
  appId: "1:131213089591:web:5577f79df2f3aac67758b2",
  measurementId: "G-WPH53JL39R"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const dbRealtime = getDatabase(app);

export { db, collection, addDoc, doc, setDoc, dbRealtime, ref, set, get, child };
