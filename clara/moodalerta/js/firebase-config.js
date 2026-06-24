// Firebase configuration template
// Substitua os valores abaixo pelos do seu projeto (Project Settings → Your apps)
var firebaseConfig = {
    apiKey: "AIzaSyCxVt-EtNjm_UwAFTqma32h8ZcnkEBC7V4",
    authDomain: "moodalerta.firebaseapp.com",
    databaseURL: "https://moodalerta-default-rtdb.firebaseio.com",
    projectId: "moodalerta",
    storageBucket: "moodalerta.firebasestorage.app",
    messagingSenderId: "49096713365",
    appId: "1:49096713365:web:2f7f0a5bc468170563279c",
    measurementId: "G-L6R9G7TZFT"
};

// Inicializa o Firebase
firebase.initializeApp(firebaseConfig);
// Observação: suas regras atuais deixam o DB público.
// Se quiser que eu cole os valores reais do SDK aqui, cole-os e eu atualizo o arquivo.

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
