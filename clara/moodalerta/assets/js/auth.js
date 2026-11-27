/* =========================================================
   MoodAlert · Autenticação
   Cadastro, login, sessão e troca de senha/e-mail.
   A senha só existe na memória do navegador durante o
   cálculo do hash; ela não é enviada nem gravada.
   ========================================================= */
(function () {
    'use strict';

    const CHAVE_SESSAO = 'moodalert:sessao';
    const VALIDADE_SESSAO = 1000 * 60 * 60 * 24 * 7; // 7 dias
    const ERRO_LOGIN = 'E-mail ou senha incorretos.';

    const normalizarEmail = (email) => String(email || '').trim().toLowerCase();
    const emailValido = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

    /** Reserva uma chave de índice de forma atômica (evita duplicatas). */
    async function reservar(caminho, uid) {
        const resultado = await window.banco.ref(caminho).transaction((atual) => {
            if (atual === null) return uid;
            return undefined; // aborta: já existe
        });
        return resultado.committed;
    }

    async function reservarCodigo(uid) {
        for (let tentativa = 0; tentativa < 5; tentativa++) {
            const codigo = Seguranca.gerarCodigo();
            if (await reservar(`indices/codigos/${codigo}`, uid)) return codigo;
        }
        throw new Error('Não foi possível gerar o código do paciente. Tente de novo.');
    }

    function salvarSessao(usuario) {
        const sessao = {
            uid: usuario.id,
            tipo: usuario.tipo,
            nome: usuario.nome,
            entrouEm: Date.now()
        };
        localStorage.setItem(CHAVE_SESSAO, JSON.stringify(sessao));
        return sessao;
    }

    const Auth = {
        emailValido,

        async cadastrar({ nome, email, senha, tipo, crm, nascimento }) {
            nome = String(nome || '').trim().replace(/\s+/g, ' ');
            email = normalizarEmail(email);

            if (nome.length < 3) throw new Error('Informe seu nome completo.');
            if (!emailValido(email)) throw new Error('Informe um e-mail válido.');
            if (!senha || senha.length < 8) throw new Error('A senha precisa ter pelo menos 8 caracteres.');
            if (!['paciente', 'medico'].includes(tipo)) throw new Error('Escolha se você é paciente ou médico.');

            const uid = DB.novoId();
            const chaveEmail = await Seguranca.chaveEmail(email);

            if (!(await reservar(`indices/emails/${chaveEmail}`, uid))) {
                throw new Error('Já existe uma conta com este e-mail.');
            }

            try {
                const credencial = await Seguranca.criarCredencial(senha);
                const usuario = { nome, email, tipo, ativo: true, criadoEm: Date.now() };

                if (tipo === 'paciente') {
                    usuario.codigo = await reservarCodigo(uid);
                    if (/^\d{4}-\d{2}-\d{2}$/.test(nascimento || '')) usuario.nascimento = nascimento;
                } else {
                    usuario.especialidade = 'Psiquiatria';
                    if (crm) usuario.crm = String(crm).trim();
                }

                await DB.atualizarVarios({
                    [`usuarios/${uid}`]: usuario,
                    [`credenciais/${uid}`]: credencial
                });
                return { id: uid, ...usuario };
            } catch (erro) {
                // Desfaz a reserva do e-mail para não travar um novo cadastro.
                await window.banco.ref(`indices/emails/${chaveEmail}`).remove().catch(() => {});
                throw erro;
            }
        },

        async entrar(email, senha) {
            email = normalizarEmail(email);
            if (!emailValido(email) || !senha) throw new Error(ERRO_LOGIN);

            const uid = await DB.Usuarios.idPorEmail(email);
            const credencial = uid ? await DB.ler(`credenciais/${uid}`) : null;

            // Mesmo sem usuário, faz um cálculo para o tempo de resposta não revelar se o e-mail existe.
            const ok = credencial
                ? await Seguranca.conferir(senha, credencial)
                : (await Seguranca.criarCredencial(senha), false);

            if (!ok) throw new Error(ERRO_LOGIN);

            const usuario = await DB.Usuarios.buscar(uid);
            if (!usuario) throw new Error(ERRO_LOGIN);
            if (usuario.ativo === false) throw new Error('Esta conta está desativada.');

            return salvarSessao(usuario);
        },

        sessao() {
            try {
                const sessao = JSON.parse(localStorage.getItem(CHAVE_SESSAO));
                if (!sessao || !sessao.uid) return null;
                if (Date.now() - sessao.entrouEm > VALIDADE_SESSAO) {
                    localStorage.removeItem(CHAVE_SESSAO);
                    return null;
                }
                return sessao;
            } catch {
                return null;
            }
        },

        atualizarSessao(dados) {
            const sessao = Auth.sessao();
            if (sessao) localStorage.setItem(CHAVE_SESSAO, JSON.stringify({ ...sessao, ...dados }));
        },

        /** Página do tipo de usuário. */
        destino(tipo) {
            return tipo === 'medico' ? 'medico.html' : 'paciente.html';
        },

        /** Garante que há sessão do tipo certo; se não, manda para o lugar correto. */
        exigir(tipo) {
            const sessao = Auth.sessao();
            if (!sessao) {
                window.location.replace('index.html');
                return null;
            }
            if (tipo && sessao.tipo !== tipo) {
                window.location.replace(Auth.destino(sessao.tipo));
                return null;
            }
            return sessao;
        },

        sair() {
            localStorage.removeItem(CHAVE_SESSAO);
            window.location.replace('index.html');
        },

        async trocarSenha(uid, senhaAtual, novaSenha) {
            if (!novaSenha || novaSenha.length < 8) throw new Error('A nova senha precisa ter pelo menos 8 caracteres.');
            const credencial = await DB.ler(`credenciais/${uid}`);
            if (!(await Seguranca.conferir(senhaAtual, credencial))) {
                throw new Error('A senha atual não confere.');
            }
            await window.banco.ref(`credenciais/${uid}`).set(await Seguranca.criarCredencial(novaSenha));
        },

        async trocarEmail(uid, emailAtual, novoEmail) {
            novoEmail = normalizarEmail(novoEmail);
            if (novoEmail === normalizarEmail(emailAtual)) return;
            if (!emailValido(novoEmail)) throw new Error('Informe um e-mail válido.');

            const novaChave = await Seguranca.chaveEmail(novoEmail);
            if (!(await reservar(`indices/emails/${novaChave}`, uid))) {
                throw new Error('Já existe uma conta com este e-mail.');
            }
            const chaveAntiga = await Seguranca.chaveEmail(emailAtual);
            await DB.atualizarVarios({
                [`usuarios/${uid}/email`]: novoEmail,
                [`indices/emails/${chaveAntiga}`]: null
            });
        }
    };

    window.Auth = Auth;
})();
