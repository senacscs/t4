// Configuração centralizada do Firebase
const firebaseConfig = {
    apiKey: "",
    authDomain: "moodalert-2973b.firebaseapp.com",
    databaseURL: "https://moodalert-2973b-default-rtdb.firebaseio.com/",
    projectId: "moodalert-2973b",
    storageBucket: "moodalert-2973b.appspot.com",
    messagingSenderId: "",
    appId: ""
};

// Inicializar Firebase (apenas uma vez)
if (typeof firebase !== 'undefined') {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
        console.log('✅ Firebase inicializado com sucesso!');
    } else {
        console.log('Firebase já estava inicializado');
    }
} else {
    console.error('❌ Firebase SDK não carregado!');
}

// Aguardar Firebase estar pronto
function whenFirebaseReady(callback) {
    if (typeof firebase !== 'undefined' && firebase.apps.length > 0) {
        callback();
    } else {
        setTimeout(() => whenFirebaseReady(callback), 100);
    }
}

// Referência ao banco de dados (criada após inicialização)
let database = null;
whenFirebaseReady(() => {
    database = firebase.database();
    console.log('✅ Database reference criada!');
});

// Funções auxiliares
/*
moodalert/
├── usuarios/
│   ├── {userId}/
│   │   ├── nome: string
│   │   ├── email: string
│   │   ├── senha: string (em produção deve ser hash)
│   │   ├── tipo: "paciente" | "medico"
│   │   ├── dataCadastro: timestamp
│   │   ├── telefone: string (opcional)
│   │   ├── dataNascimento: string (opcional)
│   │   └── crm: string (apenas médicos)
│   │
├── relacionamentos/
│   ├── {relacionamentoId}/
│   │   ├── pacienteId: string
│   │   ├── medicoId: string
│   │   ├── dataInicio: timestamp
│   │   └── ativo: boolean
│   │
├── afetivogramas/
│   ├── {pacienteId}/
│   │   ├── {ano}/
│   │   │   ├── {mes}/
│   │   │   │   ├── {dia}/
│   │   │   │   │   ├── emocao: string
│   │   │   │   │   ├── intensidade: "leve" | "neutro" | "elevada" | "critica"
│   │   │   │   │   ├── observacoes: string
│   │   │   │   │   └── timestamp: number
│   │
├── diarios/
│   ├── {pacienteId}/
│   │   ├── {registroId}/
│   │   │   ├── texto: string
│   │   │   ├── timestamp: number
│   │   │   └── dataCriacao: string
│   │
├── alarmes/
│   ├── {pacienteId}/
│   │   ├── {alarmeId}/
│   │   │   ├── nome: string
│   │   │   ├── horario: string
│   │   │   ├── dias: array[string]
│   │   │   ├── observacoes: string
│   │   │   ├── ativo: boolean
│   │   │   └── dataCriacao: timestamp
│   │
├── anotacoes/
│   ├── {anotacaoId}/
│   │   ├── medicoId: string
│   │   ├── pacienteId: string
│   │   ├── tipo: "orientacao" | "observacao" | "recomendacao" | "alerta"
│   │   ├── visibilidade: "paciente" | "privada"
│   │   ├── conteudo: string
│   │   ├── prioridade: "alta" | "media" | "baixa"
│   │   └── timestamp: number
*/

// Funções auxiliares
const FirebaseHelper = {
    // Gerar ID único
    generateId: () => {
        if (!database) {
            console.error('Database não inicializado!');
            return Date.now().toString();
        }
        return database.ref().push().key;
    },

    // Obter timestamp atual
    getTimestamp: () => {
        if (typeof firebase !== 'undefined' && firebase.database) {
            return firebase.database.ServerValue.TIMESTAMP;
        }
        return Date.now();
    },

    // Normalizar email
    normalizeEmail: (email) => email.trim().toLowerCase(),

    // Referências rápidas
    refs: {
        usuarios: () => {
            if (!database) return null;
            return database.ref('usuarios');
        },
        relacionamentos: () => {
            if (!database) return null;
            return database.ref('relacionamentos');
        },
        afetivogramas: () => {
            if (!database) return null;
            return database.ref('afetivogramas');
        },
        diarios: () => {
            if (!database) return null;
            return database.ref('diarios');
        },
        alarmes: () => {
            if (!database) return null;
            return database.ref('alarmes');
        },
        anotacoes: () => {
            if (!database) return null;
            return database.ref('anotacoes');
        }
    },

    // Verificar se Firebase está pronto
    isReady: () => {
        return typeof firebase !== 'undefined' && firebase.apps.length > 0 && database !== null;
    }
};

// Exportar para uso global
window.db = database;
window.FirebaseHelper = FirebaseHelper;

// Atualizar referência global quando database estiver pronto
whenFirebaseReady(() => {
    window.db = database;
});
