    import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
    import {
      getDatabase,
      ref,
      onValue,
      runTransaction
    } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";

    const firebaseConfig = {
      apiKey: "AIzaSyAx78shLCE0VyNkB7nZ8Wq0yU6-UB2C7I8",
      authDomain: "teste-senac-7fcd3.firebaseapp.com",
      projectId: "teste-senac-7fcd3",
      storageBucket: "teste-senac-7fcd3.appspot.com",
      messagingSenderId: "687441576323",
      appId: "1:687441576323:web:aae20f52d8f2247e65f6b6",
      databaseURL: "https://teste-senac-7fcd3-default-rtdb.firebaseio.com"
    };

    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
