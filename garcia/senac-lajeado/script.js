  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-analytics.js";
  import { getDatabase, ref, push, set, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";
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
  // Realtime Database
  const db = getDatabase(app);
  try {
    const rootRef = ref(db);
    console.log('[quiz] Realtime Database inicializado');
    console.log('[quiz] DB root URL:', rootRef.toString());
  } catch (_) {}

  // Save to Realtime Database only after the user submits the contact form successfully
  document.addEventListener('contact:submitted', async (evt) => {
    try {
      const { nome, email, cel, yesCount, noCount } = evt.detail || {};
      console.log('[quiz] Evento recebido com payload:', { nome, email, cel, yesCount, noCount });
      const newRef = push(ref(db, 'quizResponses'));
      await set(newRef, {
        nome,
        email,
        celular: cel,
        yesCount,
        noCount,
        createdAt: serverTimestamp(),
        userAgent: navigator.userAgent
      });
      console.log('[quiz] Dados enviados para o Realtime Database em:', newRef.toString());
    } catch (err) {
      console.error('[quiz] Erro ao enviar para o Realtime Database', {
        code: err?.code,
        message: err?.message,
        name: err?.name,
        err
      });
    }
  });
