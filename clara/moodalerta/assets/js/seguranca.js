/* =========================================================
   MoodAlert · Segurança de senhas
   O banco é público, então a senha NUNCA é gravada.
   Gravamos só o resultado do PBKDF2-SHA256 (210.000 rodadas,
   recomendação da OWASP) com um "sal" aleatório por usuário.
   Sem a senha original, o hash não pode ser revertido.
   O mesmo algoritmo é usado em scripts/migrar-banco.mjs.
   ========================================================= */
(function () {
    'use strict';

    const ALGORITMO = 'PBKDF2-SHA256';
    const ITERACOES = 210000;
    const TAMANHO_SAL = 16;   // bytes
    const TAMANHO_HASH = 32;  // bytes

    const paraHex = (bytes) => Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');

    const deHex = (hex) => {
        const bytes = new Uint8Array(hex.length / 2);
        for (let i = 0; i < bytes.length; i++) {
            bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
        }
        return bytes;
    };

    function exigirCrypto() {
        if (!window.crypto || !window.crypto.subtle) {
            throw new Error('Seu navegador não liberou a criptografia necessária. Abra o site por https, localhost ou direto do arquivo.');
        }
    }

    async function derivar(senha, salHex, iteracoes) {
        exigirCrypto();
        const chave = await crypto.subtle.importKey(
            'raw',
            new TextEncoder().encode(senha.normalize('NFKC')),
            'PBKDF2',
            false,
            ['deriveBits']
        );
        const bits = await crypto.subtle.deriveBits(
            { name: 'PBKDF2', salt: deHex(salHex), iterations: iteracoes, hash: 'SHA-256' },
            chave,
            TAMANHO_HASH * 8
        );
        return paraHex(new Uint8Array(bits));
    }

    // Comparação sem atalho, para não vazar pelo tempo de resposta.
    function iguais(a, b) {
        if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return false;
        let diferenca = 0;
        for (let i = 0; i < a.length; i++) {
            diferenca |= a.charCodeAt(i) ^ b.charCodeAt(i);
        }
        return diferenca === 0;
    }

    const Seguranca = {
        ALGORITMO,
        ITERACOES,

        aleatorioHex(bytes) {
            exigirCrypto();
            return paraHex(crypto.getRandomValues(new Uint8Array(bytes)));
        },

        async sha256(texto) {
            exigirCrypto();
            const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(texto));
            return paraHex(new Uint8Array(digest));
        },

        /** Gera o registro que vai para credenciais/{uid}. */
        async criarCredencial(senha) {
            const sal = Seguranca.aleatorioHex(TAMANHO_SAL);
            return {
                algoritmo: ALGORITMO,
                iteracoes: ITERACOES,
                sal,
                hash: await derivar(senha, sal, ITERACOES),
                atualizadoEm: Date.now()
            };
        },

        async conferir(senha, credencial) {
            if (!credencial || credencial.algoritmo !== ALGORITMO) return false;
            const hash = await derivar(senha, credencial.sal, credencial.iteracoes);
            return iguais(hash, credencial.hash);
        },

        /** Chave usada no índice de e-mails (o e-mail não aparece no índice). */
        chaveEmail(email) {
            return Seguranca.sha256(String(email).trim().toLowerCase());
        },

        /** Código curto do paciente, ex.: "K7P-Q3M" (sem letras confusas). */
        gerarCodigo() {
            exigirCrypto();
            const alfabeto = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
            const bytes = crypto.getRandomValues(new Uint8Array(6));
            const letras = Array.from(bytes, (b) => alfabeto[b % alfabeto.length]).join('');
            return `${letras.slice(0, 3)}-${letras.slice(3)}`;
        },

        /** Nota de 0 a 4 para a barra de força da senha. */
        forcaSenha(senha) {
            if (!senha) return 0;
            let pontos = 0;
            if (senha.length >= 8) pontos++;
            if (senha.length >= 12) pontos++;
            if (/[a-z]/.test(senha) && /[A-Z]/.test(senha)) pontos++;
            if (/\d/.test(senha) && /[^A-Za-z0-9]/.test(senha)) pontos++;
            return Math.max(1, Math.min(4, pontos));
        }
    };

    window.Seguranca = Seguranca;
})();
