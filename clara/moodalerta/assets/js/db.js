/* =========================================================
   MoodAlert · Acesso ao banco (Realtime Database)
   Toda leitura e escrita passa por aqui. Estrutura completa
   em docs/BANCO.md.
   ========================================================= */
(function () {
    'use strict';

    const ref = (caminho) => window.banco.ref(caminho);
    const agora = () => Date.now();

    async function ler(caminho) {
        const snap = await ref(caminho).get();
        return snap.exists() ? snap.val() : null;
    }

    /** Converte {id: dados} em [{id, ...dados}]. */
    function lista(objeto) {
        return Object.entries(objeto || {}).map(([id, dados]) => ({ id, ...dados }));
    }

    const pad = (n) => String(n).padStart(2, '0');

    /** Data local no formato AAAA-MM-DD (chave do afetivograma). */
    function chaveData(data) {
        return `${data.getFullYear()}-${pad(data.getMonth() + 1)}-${pad(data.getDate())}`;
    }

    const DB = {
        ler,
        lista,
        chaveData,
        novoId: () => ref('_').push().key,

        /** Grava vários caminhos de uma vez (tudo ou nada). */
        atualizarVarios: (mudancas) => ref('/').update(mudancas),

        // ==================== USUÁRIOS ====================
        Usuarios: {
            async buscar(uid) {
                if (!uid || /[.#$\[\]\/]/.test(uid)) return null;
                const dados = await ler(`usuarios/${uid}`);
                return dados ? { id: uid, ...dados } : null;
            },

            async buscarVarios(uids) {
                const usuarios = await Promise.all(uids.map((uid) => DB.Usuarios.buscar(uid)));
                return usuarios.filter(Boolean);
            },

            async idPorEmail(email) {
                const chave = await Seguranca.chaveEmail(email);
                return ler(`indices/emails/${chave}`);
            },

            async idPorCodigo(codigo) {
                const limpo = String(codigo || '').trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
                if (limpo.length !== 6) return null;
                return ler(`indices/codigos/${limpo.slice(0, 3)}-${limpo.slice(3)}`);
            },

            /** Aceita o código curto (ABC-123) ou o ID completo do Firebase. */
            async localizarPaciente(texto) {
                const valor = String(texto || '').trim();
                if (!valor) return null;
                const uid = (await DB.Usuarios.idPorCodigo(valor)) || valor;
                const usuario = await DB.Usuarios.buscar(uid);
                return usuario && usuario.tipo === 'paciente' ? usuario : null;
            },

            atualizar(uid, dados) {
                const permitidos = ['nome', 'telefone', 'nascimento', 'foto', 'crm', 'especialidade'];
                const limpo = {};
                permitidos.forEach((campo) => {
                    if (dados[campo] !== undefined) limpo[campo] = dados[campo] === '' ? null : dados[campo];
                });
                return ref(`usuarios/${uid}`).update(limpo);
            }
        },

        // ==================== AFETIVOGRAMA ====================
        Afetivograma: {
            /** Registros entre duas datas (AAAA-MM-DD), em {chave: registro}. */
            async intervalo(pacienteId, inicio, fim) {
                const snap = await ref(`afetivogramas/${pacienteId}`)
                    .orderByKey()
                    .startAt(inicio)
                    .endAt(fim)
                    .get();
                return snap.val() || {};
            },

            /** Registros de um mês, em {dia: registro}. mes vai de 1 a 12. */
            async mes(pacienteId, ano, mes) {
                const prefixo = `${ano}-${pad(mes)}`;
                const dados = await DB.Afetivograma.intervalo(pacienteId, `${prefixo}-01`, `${prefixo}-31`);
                const porDia = {};
                Object.entries(dados).forEach(([chave, registro]) => {
                    porDia[Number(chave.slice(8, 10))] = registro;
                });
                return porDia;
            },

            /** Últimos N dias até hoje, em {AAAA-MM-DD: registro}. */
            ultimosDias(pacienteId, dias) {
                const fim = new Date();
                const inicio = new Date();
                inicio.setDate(fim.getDate() - (dias - 1));
                return DB.Afetivograma.intervalo(pacienteId, chaveData(inicio), chaveData(fim));
            },

            salvar(pacienteId, data, { emocao, intensidade, observacoes }) {
                return ref(`afetivogramas/${pacienteId}/${chaveData(data)}`).set({
                    emocao,
                    intensidade,
                    observacoes: observacoes || '',
                    registradoEm: agora()
                });
            },

            remover(pacienteId, data) {
                return ref(`afetivogramas/${pacienteId}/${chaveData(data)}`).remove();
            }
        },

        // ==================== DIÁRIO ====================
        Diario: {
            async listar(pacienteId, limite = 50) {
                // IDs do push() já saem em ordem de criação: dispensa índice no banco.
                const snap = await ref(`diarios/${pacienteId}`)
                    .orderByKey()
                    .limitToLast(limite)
                    .get();
                return lista(snap.val()).sort((a, b) => b.criadoEm - a.criadoEm);
            },

            async criar(pacienteId, texto) {
                const novo = ref(`diarios/${pacienteId}`).push();
                const registro = { texto: texto.trim(), criadoEm: agora() };
                await novo.set(registro);
                return { id: novo.key, ...registro };
            },

            atualizar: (pacienteId, id, texto) => ref(`diarios/${pacienteId}/${id}`).update({ texto: texto.trim(), editadoEm: agora() }),

            excluir: (pacienteId, id) => ref(`diarios/${pacienteId}/${id}`).remove()
        },

        // ==================== ALARMES ====================
        Alarmes: {
            async listar(pacienteId) {
                return lista(await ler(`alarmes/${pacienteId}`))
                    .map((a) => ({ ...a, dias: (a.dias || []).map(Number) }))
                    .sort((a, b) => a.horario.localeCompare(b.horario));
            },

            async salvar(pacienteId, id, { nome, horario, dias, observacoes }) {
                const dados = {
                    nome: nome.trim(),
                    horario,
                    dias: dias.map(Number).sort((a, b) => a - b),
                    observacoes: (observacoes || '').trim(),
                    atualizadoEm: agora()
                };
                if (id) {
                    await ref(`alarmes/${pacienteId}/${id}`).update(dados);
                    return id;
                }
                const novo = ref(`alarmes/${pacienteId}`).push();
                await novo.set({ ...dados, ativo: true, criadoEm: agora() });
                return novo.key;
            },

            alternar: (pacienteId, id, ativo) => ref(`alarmes/${pacienteId}/${id}`).update({ ativo }),
            excluir: (pacienteId, id) => ref(`alarmes/${pacienteId}/${id}`).remove()
        },

        // ==================== ANOTAÇÕES MÉDICAS ====================
        Anotacoes: {
            async listar(pacienteId, { somentePaciente = false } = {}) {
                const todas = lista(await ler(`anotacoes/${pacienteId}`))
                    .map((a) => ({ ...a, pacienteId }))
                    .sort((a, b) => b.criadoEm - a.criadoEm);
                return somentePaciente ? todas.filter((a) => a.visibilidade === 'paciente') : todas;
            },

            async criar(pacienteId, medicoId, { tipo, visibilidade, prioridade, conteudo }) {
                const nova = ref(`anotacoes/${pacienteId}`).push();
                await nova.set({
                    medicoId,
                    tipo,
                    visibilidade,
                    prioridade: prioridade || 'media',
                    conteudo: conteudo.trim(),
                    criadoEm: agora(),
                    lida: false
                });
                return nova.key;
            },

            marcarLidas(pacienteId, ids) {
                if (!ids.length) return Promise.resolve();
                const mudancas = {};
                ids.forEach((id) => { mudancas[`anotacoes/${pacienteId}/${id}/lida`] = true; });
                return DB.atualizarVarios(mudancas);
            },

            excluir: (pacienteId, id) => ref(`anotacoes/${pacienteId}/${id}`).remove()
        },

        // ==================== VÍNCULO MÉDICO ↔ PACIENTE ====================
        Vinculos: {
            /** Médico do paciente (ou null). */
            async medicoDoPaciente(pacienteId) {
                const vinculo = await ler(`vinculos/pacientes/${pacienteId}`);
                if (!vinculo) return null;
                const medico = await DB.Usuarios.buscar(vinculo.medicoId);
                return medico ? { ...medico, desde: vinculo.desde } : null;
            },

            /** Pacientes do médico, com a data do vínculo. */
            async pacientesDoMedico(medicoId) {
                const vinculos = (await ler(`vinculos/medicos/${medicoId}`)) || {};
                const pacientes = await DB.Usuarios.buscarVarios(Object.keys(vinculos));
                return pacientes
                    .map((p) => ({ ...p, vinculadoEm: vinculos[p.id].desde }))
                    .sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
            },

            async vincular(medicoId, pacienteId) {
                const atual = await ler(`vinculos/pacientes/${pacienteId}`);
                if (atual && atual.medicoId === medicoId) {
                    throw new Error('Este paciente já está na sua lista.');
                }
                if (atual) {
                    throw new Error('Este paciente já é acompanhado por outro médico.');
                }
                const desde = agora();
                return DB.atualizarVarios({
                    [`vinculos/medicos/${medicoId}/${pacienteId}`]: { desde },
                    [`vinculos/pacientes/${pacienteId}`]: { medicoId, desde }
                });
            },

            desvincular(medicoId, pacienteId) {
                return DB.atualizarVarios({
                    [`vinculos/medicos/${medicoId}/${pacienteId}`]: null,
                    [`vinculos/pacientes/${pacienteId}`]: null
                });
            }
        }
    };

    window.DB = DB;
})();
