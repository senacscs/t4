import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-analytics.js";
import { getDatabase, ref, push, set, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDDfXfA9JkFkpSNRVqi1MUZx5VVyJ_4N9Q",
  authDomain: "senac-lajeado.firebaseapp.com",
  projectId: "senac-lajeado",
  storageBucket: "senac-lajeado.appspot.com", // <-- corrigido aqui
  messagingSenderId: "735105605341",
  appId: "1:735105605341:web:69ec8f755b01b8fe928534",
  measurementId: "G-CVD9BJVHQC",
  databaseURL: "https://senac-lajeado-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);
const db = getDatabase(app);

// Listener para quando o formulário for enviado
document.addEventListener('contact:submitted', async (evt) => {
  try {
    const { nome, email, cel, yesCount, noCount } = evt.detail || {};
    console.log('[quiz] Evento recebido:', { nome, email, cel, yesCount, noCount });
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
    console.log('[quiz] Dados enviados para:', newRef.toString());
  } catch (err) {
    console.error('[quiz] Erro ao enviar:', err);
  }
});
