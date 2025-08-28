  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-analytics.js";
  import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDDfXfA9JkFkpSNRVqi1MUZx5VVyJ_4N9Q",
    authDomain: "senac-lajeado.firebaseapp.com",
    projectId: "senac-lajeado",
    storageBucket: "senac-lajeado.firebasestorage.app",
    messagingSenderId: "735105605341",
    appId: "1:735105605341:web:69ec8f755b01b8fe928534",
  measurementId: "G-CVD9BJVHQC",
  databaseURL: "https://senac-lajeado-default-rtdb.firebaseio.com"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  // Firestore Database
  const db = getFirestore(app);
  try { console.log('[quiz] Firestore inicializado'); } catch (_) {}

  // Save to Firestore only after the user submits the contact form successfully
  document.addEventListener('contact:submitted', async (evt) => {
    try {
      const { nome, email, cel, yesCount, noCount } = evt.detail || {};
      await addDoc(collection(db, 'quizResponses'), {
        nome,
        email,
        celular: cel,
        yesCount,
        noCount,
        createdAt: serverTimestamp(),
        userAgent: navigator.userAgent
      });
      console.log('[quiz] Dados enviados para o Firestore');
    } catch (err) {
      console.error('[quiz] Erro ao enviar para o Firestore', err);
    }
  });
