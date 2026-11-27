/* =========================================================
   MoodAlert · Conexão com o Firebase
   Usa o SDK "compat" carregado por <script>, então o site
   funciona abrindo o index.html direto, sem servidor.
   A apiKey do Firebase Web é pública por natureza: ela só
   identifica o projeto, não dá acesso de administrador.
   ========================================================= */
(function () {
    'use strict';

    const firebaseConfig = {
        apiKey: 'AIzaSyCxVt-EtNjm_UwAFTqma32h8ZcnkEBC7V4',
        authDomain: 'moodalerta.firebaseapp.com',
        databaseURL: 'https://moodalerta-default-rtdb.firebaseio.com',
        projectId: 'moodalerta',
        storageBucket: 'moodalerta.firebasestorage.app',
        messagingSenderId: '49096713365',
        appId: '1:49096713365:web:2f7f0a5bc468170563279c',
        measurementId: 'G-L6R9G7TZFT'
    };

    if (typeof firebase === 'undefined') {
        console.error('[MoodAlert] SDK do Firebase não carregou. Verifique a conexão com a internet.');
        return;
    }

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    window.banco = firebase.database();
})();
