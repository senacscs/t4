// Sistema de autenticação e gerenciamento de sessão

const Auth = {
    // Chave para armazenar sessão
    SESSION_KEY: 'moodalert_session',

    // Fazer login
    login: async (email, senha) => {
        try {
            // Aguardar Firebase estar pronto
            if (!FirebaseHelper.isReady()) {
                await new Promise(resolve => {
                    const checkReady = setInterval(() => {
                        if (FirebaseHelper.isReady()) {
                            clearInterval(checkReady);
                            resolve();
                        }
                    }, 100);
                });
            }

            const normalizedEmail = FirebaseHelper.normalizeEmail(email);
            
            // Buscar usuário por email
            const snapshot = await window.db.ref('usuarios')
                .orderByChild('email')
                .equalTo(normalizedEmail)
                .once('value');

            if (!snapshot.exists()) {
                throw new Error('Usuário não encontrado!');
            }

            let usuario = null;
            let userId = null;

            snapshot.forEach((childSnapshot) => {
                const data = childSnapshot.val();
                if (data.senha === senha) {
                    usuario = data;
                    userId = childSnapshot.key;
                }
            });

            if (!usuario) {
                throw new Error('Senha incorreta!');
            }

            // Limpar dados do usuário anterior antes de fazer login
            Auth.clearUserData();

            // Criar sessão
            const sessao = {
                userId,
                nome: usuario.nome,
                email: usuario.email,
                tipo: usuario.tipo,
                loginAt: Date.now()
            };

            // Salvar sessão
            localStorage.setItem(Auth.SESSION_KEY, JSON.stringify(sessao));

            return { success: true, usuario: sessao };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Registrar novo usuário
    register: async (dadosUsuario) => {
        try {
            // Aguardar Firebase estar pronto
            if (!FirebaseHelper.isReady()) {
                await new Promise(resolve => {
                    const checkReady = setInterval(() => {
                        if (FirebaseHelper.isReady()) {
                            clearInterval(checkReady);
                            resolve();
                        }
                    }, 100);
                });
            }

            const { nome, email, senha, tipo } = dadosUsuario;
            const normalizedEmail = FirebaseHelper.normalizeEmail(email);

            // Verificar se email já existe
            const emailExists = await Auth.checkEmailExists(normalizedEmail);
            if (emailExists) {
                throw new Error('Já existe um usuário cadastrado com este email!');
            }

            // Criar novo usuário
            const userId = FirebaseHelper.generateId();
            const novoUsuario = {
                nome: nome.trim(),
                email: normalizedEmail,
                senha, // Em produção, usar hash
                tipo,
                dataCadastro: Date.now(),
                ativo: true
            };

            await window.db.ref(`usuarios/${userId}`).set(novoUsuario);

            return { success: true, userId };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Verificar se email existe
    checkEmailExists: async (email) => {
        const snapshot = await window.db.ref('usuarios')
            .orderByChild('email')
            .equalTo(email)
            .once('value');
        return snapshot.exists();
    },

    // Obter sessão atual
    getSession: () => {
        try {
            const sessao = localStorage.getItem(Auth.SESSION_KEY);
            return sessao ? JSON.parse(sessao) : null;
        } catch {
            return null;
        }
    },

    // Verificar se está autenticado
    isAuthenticated: () => {
        return Auth.getSession() !== null;
    },

    // Logout
    logout: () => {
        // Limpar apenas os dados do usuário atual, mantendo dados de cache do Firebase
        const keysToRemove = [];
        const sessao = Auth.getSession();
        const userId = sessao?.userId;

        // Se temos userId, limpar apenas suas chaves
        if (userId) {
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && (
                    key.includes(`-${userId}`) || 
                    key === Auth.SESSION_KEY ||
                    key === 'usuario'
                )) {
                    keysToRemove.push(key);
                }
            }
        } else {
            // Se não temos userId, limpar tudo menos configurações do sistema
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && !key.startsWith('firebase:')) {
                    keysToRemove.push(key);
                }
            }
        }

        // Remover as chaves identificadas
        keysToRemove.forEach(key => localStorage.removeItem(key));
        
        // Redirecionar para login
        window.location.href = '../index.html';
    },

    // Verificar tipo de usuário
    getUserType: () => {
        const session = Auth.getSession();
        return session ? session.tipo : null;
    },

    // Obter ID do usuário atual
    getCurrentUserId: () => {
        const session = Auth.getSession();
        return session ? session.userId : null;
    },

    // Redirecionar se não autenticado
    requireAuth: (tipoEsperado = null) => {
        if (!Auth.isAuthenticated()) {
            window.location.href = '../index.html';
            return false;
        }

        if (tipoEsperado && Auth.getUserType() !== tipoEsperado) {
            window.location.href = '../index.html';
            return false;
        }

        return true;
    },

    // Limpar dados de usuário do localStorage
    clearUserData: () => {
        const keysToRemove = [];
        
        // Identificar chaves relacionadas a dados de usuário
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && (
                key.startsWith('afetivograma-') ||
                key.startsWith('diario-') ||
                key.startsWith('alarmes-') ||
                key.startsWith('anotacoes-medicas-') ||
                key === 'usuario' ||
                key === Auth.SESSION_KEY
            )) {
                keysToRemove.push(key);
            }
        }

        // Remover as chaves identificadas
        keysToRemove.forEach(key => localStorage.removeItem(key));
    }
};

// Exportar para uso global
window.Auth = Auth;
