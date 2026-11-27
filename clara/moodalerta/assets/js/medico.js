/* =========================================================
   MoodAlert · Painel do médico
   Painel geral, pacientes, acompanhamento e anotações.
   Só os pacientes vinculados têm os dados exibidos.
   ========================================================= */
(function () {
    'use strict';

    const sessao = Auth.exigir('medico');
    if (!sessao) return;

    const { $, $$, el, icone, limpar, datas, toast, Modal, ocupado, confirmar, vazio, esqueleto } = UI;
    const MID = sessao.uid;

    let medico = { id: MID, nome: sessao.nome, tipo: 'medico' };
    let pacientes = [];          // pacientes vinculados
    const resumos = new Map();   // pacienteId → { avaliacao, ultimoRegistro, ultimoDiario, anotacoes, registrouHoje }
    let atual = null;            // paciente em acompanhamento
    let calendario = null;
    let mostrarSecao = null;

    // ==================== CABEÇALHO E PERFIL ====================
    let perfil = null;

    function atualizarCabecalho() {
        $('#userNome').textContent = UI.tituloMedico(medico);
        UI.preencherAvatar($('#userAvatar'), medico);
        const hora = new Date().getHours();
        const cumprimento = hora < 12 ? 'Bom dia' : hora < 18 ? 'Boa tarde' : 'Boa noite';
        const data = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
        $('#saudacao').textContent = `${cumprimento}, ${UI.tituloMedico(medico).split(' ').slice(0, 2).join(' ')} · ${data}`;
    }

    async function carregarMedico() {
        const dados = await DB.Usuarios.buscar(MID);
        if (!dados) {
            toast('Sua conta não foi encontrada.', 'erro');
            setTimeout(Auth.sair, 1500);
            return false;
        }
        medico = dados;
        atualizarCabecalho();
        perfil = Perfil.iniciar({ usuario: medico, aoAtualizar: (novo) => { medico = novo; atualizarCabecalho(); } });
        return true;
    }

    const abrirPerfil = () => perfil && perfil.abrir();
    $('#userChip').addEventListener('click', abrirPerfil);
    $('#userChip').addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); abrirPerfil(); } });

    $('#btnSair').addEventListener('click', async () => {
        if (await confirmar({ titulo: 'Sair da conta?', botao: 'Sair' })) Auth.sair();
    });

    // ==================== DADOS ====================
    async function carregarResumo(paciente) {
        const [quinzena, diario, anotacoes] = await Promise.all([
            DB.Afetivograma.ultimosDias(paciente.id, 14),
            DB.Diario.listar(paciente.id, 1),
            DB.Anotacoes.listar(paciente.id)
        ]);
        // A avaliação considera só a última semana; a faixa mostra 14 dias.
        const inicioSemana = new Date();
        inicioSemana.setDate(inicioSemana.getDate() - 6);
        const corte = DB.chaveData(inicioSemana);
        const ultimos = {};
        Object.keys(quinzena).forEach((k) => { if (k >= corte) ultimos[k] = quinzena[k]; });
        const avaliacao = Afetivograma.avaliar(ultimos);
        const ultimo = avaliacao.ultimo;
        const resumo = {
            avaliacao,
            ultimoRegistro: ultimo,
            ultimaAtividade: Math.max(ultimo ? ultimo.registradoEm || 0 : 0, diario[0] ? diario[0].criadoEm : 0) || null,
            anotacoes: anotacoes.filter((a) => a.medicoId === MID),
            registrouHoje: !!ultimos[DB.chaveData(new Date())],
            quinzena
        };
        resumos.set(paciente.id, resumo);
        return resumo;
    }

    async function carregarTudo() {
        limpar($('#listaRecentes'), esqueleto(3, 58));
        limpar($('#listaAlertas'), esqueleto(2, 58));
        limpar($('#gradePacientes'), esqueleto(2, 170));
        try {
            pacientes = await DB.Vinculos.pacientesDoMedico(MID);
            await Promise.all(pacientes.map(carregarResumo));
        } catch (erro) {
            console.error(erro);
            toast('Não foi possível carregar os pacientes. Verifique a conexão.', 'erro');
        }
        desenharPainel();
        desenharPacientes();
        preencherSelecoes();
        desenharAnotacoesGerais();
    }

    // ==================== PAINEL ====================
    function linhaPaciente(paciente, detalhe, extra) {
        return el('button', { class: 'row-item painel-cols', type: 'button', on: { click: () => abrirPaciente(paciente.id) } },
            el('div', { class: 'cell-person' }, UI.avatar(paciente, 'sm'),
                el('div', {}, el('strong', { text: paciente.nome }), el('small', { text: detalhe }))),
            extra
        );
    }

    /** Faixa com os últimos 14 dias, uma célula por dia, na cor da intensidade. */
    function faixaDias(quinzena = {}) {
        const fmt = new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'short' });
        const celulas = [];
        for (let i = 13; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const r = quinzena[DB.chaveData(d)];
            celulas.push(el('i', {
                class: r ? r.intensidade : '',
                title: r ? `${fmt.format(d)}: ${r.emocao}, ${UI.INTENSIDADES[r.intensidade] || ''}` : `${fmt.format(d)}: sem registro`
            }));
        }
        return el('div', { class: 'mini-strip', 'aria-label': 'Últimos 14 dias' }, celulas);
    }

    function badgeStatus(avaliacao) {
        return el('span', { class: `badge ${avaliacao.classe}`.trim(), text: avaliacao.texto });
    }

    function desenharPainel() {
        const lista = pacientes.map((p) => ({ p, r: resumos.get(p.id) })).filter((x) => x.r);
        const totalAnotacoes = lista.reduce((soma, x) => soma + x.r.anotacoes.length, 0);
        const alertas = gerarAlertas(lista);

        $('#statPacientes').textContent = pacientes.length;
        $('#statHoje').textContent = lista.filter((x) => x.r.registrouHoje).length;
        $('#statAnotacoes').textContent = totalAnotacoes;
        $('#statAlertas').textContent = alertas.length;

        if (!pacientes.length) {
            limpar($('#listaRecentes'), vazio('people-outline', 'Nenhum paciente ainda', 'Adicione pacientes pelo código para começar o acompanhamento.'),
                el('button', { class: 'btn btn-primary', type: 'button', style: 'margin:0 auto', on: { click: () => abrirAdicionar() } }, icone('person-add-outline'), 'Adicionar paciente'));
            limpar($('#listaAlertas'), vazio('checkmark-done-outline', 'Nenhum alerta', 'Os alertas aparecem aqui quando um paciente precisar de atenção.'));
            return;
        }

        const recentes = lista
            .slice()
            .sort((a, b) => (b.r.ultimaAtividade || 0) - (a.r.ultimaAtividade || 0))
            .slice(0, 10);

        limpar($('#listaRecentes'), recentes.map(({ p, r }) =>
            linhaPaciente(p, `Última atividade: ${datas.relativo(r.ultimaAtividade)}`, [faixaDias(r.quinzena), badgeStatus(r.avaliacao)])
        ));

        limpar($('#listaAlertas'), alertas.length
            ? alertas.map((a) => el('button', { class: `row-item alert-item ${a.classe}`, type: 'button', on: { click: () => abrirPaciente(a.paciente.id) } },
                el('span', { class: 'alert-icon' }, icone(a.icone)),
                el('div', {}, el('strong', { text: `${a.paciente.nome} · ${a.titulo}` }), el('small', { text: a.texto }))
            ))
            : vazio('checkmark-done-outline', 'Tudo tranquilo', 'Nenhum paciente com sinais de alerta nos últimos 7 dias.'));
    }

    function gerarAlertas(lista) {
        const alertas = [];
        lista.forEach(({ p, r }) => {
            const { avaliacao } = r;
            if (avaliacao.classe === 'critico') {
                alertas.push({
                    paciente: p, classe: 'critico', icone: 'alert-circle-outline', nivel: 3,
                    titulo: 'Intensidade crítica',
                    texto: `${avaliacao.criticos} dia(s) crítico(s) na última semana · último: ${avaliacao.ultimo.emocao}`
                });
            } else if (avaliacao.classe === 'atencao') {
                alertas.push({
                    paciente: p, classe: '', icone: 'warning-outline', nivel: 2,
                    titulo: 'Precisa de atenção',
                    texto: `${avaliacao.elevados + avaliacao.criticos} dia(s) com intensidade elevada ou crítica`
                });
            }
            const diasSemRegistro = r.ultimaAtividade ? Math.floor((Date.now() - r.ultimaAtividade) / 86400000) : null;
            if (diasSemRegistro === null || diasSemRegistro >= 5) {
                alertas.push({
                    paciente: p, classe: 'info', icone: 'hourglass-outline', nivel: 1,
                    titulo: 'Sem registros',
                    texto: diasSemRegistro === null ? 'Ainda não fez nenhum registro.' : `Nenhuma atividade há ${diasSemRegistro} dias.`
                });
            }
        });
        return alertas.sort((a, b) => b.nivel - a.nivel);
    }

    $('#btnAtualizar').addEventListener('click', async (e) => {
        const botao = e.currentTarget;
        ocupado(botao, true);
        await carregarTudo();
        ocupado(botao, false);
        toast('Dados atualizados.');
    });

    // ==================== PACIENTES ====================
    function desenharPacientes() {
        const grade = $('#gradePacientes');
        const termo = $('#filtroNome').value.trim().toLowerCase();
        const filtrados = pacientes.filter((p) => p.nome.toLowerCase().includes(termo));

        if (!pacientes.length) {
            return limpar(grade, el('div', { class: 'card' }, vazio('people-outline', 'Você ainda não tem pacientes', 'Clique em “Adicionar paciente” e digite o código que aparece no perfil dele.')));
        }
        if (!filtrados.length) {
            return limpar(grade, el('div', { class: 'card' }, vazio('search-outline', 'Nenhum paciente encontrado', `Ninguém com “${termo}” no nome.`)));
        }

        limpar(grade, filtrados.map((p) => {
            const r = resumos.get(p.id) || {};
            const ultimo = r.ultimoRegistro;
            const linha = el('div', { class: 'row-item pac-cols', role: 'button', tabindex: '0', 'aria-label': `Acompanhar ${p.nome}` },
                el('div', { class: 'cell-person' }, UI.avatar(p, 'sm'),
                    el('div', {}, el('strong', { text: p.nome }), el('small', { text: `Código ${p.codigo || '—'}` }))),
                faixaDias(r.quinzena),
                el('span', { class: 'cell', text: ultimo ? `${ultimo.emocao}, ${(UI.INTENSIDADES[ultimo.intensidade] || '').toLowerCase()}` : '—' }),
                el('span', { class: 'cell muted', text: datas.relativo(r.ultimaAtividade) }),
                el('span', { class: 'cell', text: String((r.anotacoes || []).length) }),
                el('span', {}, r.avaliacao ? badgeStatus(r.avaliacao) : null),
                el('span', { class: 'cell-go', 'aria-hidden': 'true' }, icone('chevron-forward'))
            );
            linha.addEventListener('click', () => abrirPaciente(p.id));
            linha.addEventListener('keydown', (e) => { if (e.key === 'Enter') abrirPaciente(p.id); });
            return linha;
        }));
    }

    $('#filtroNome').addEventListener('input', desenharPacientes);

    // Adicionar paciente
    const modalAdicionar = $('#modalAdicionar');
    const formAdicionar = $('#formAdicionar');

    function abrirAdicionar(codigo = '') {
        formAdicionar.reset();
        formAdicionar.codigo.value = codigo;
        $('[data-alerta]', formAdicionar).hidden = true;
        limpar($('#previaPaciente'));
        Modal.abrir(modalAdicionar);
    }

    $('#btnAdicionar').addEventListener('click', () => abrirAdicionar());

    formAdicionar.codigo.addEventListener('input', () => {
        const v = formAdicionar.codigo.value.toUpperCase();
        if (/^[A-Z0-9]{4,6}$/.test(v)) formAdicionar.codigo.value = `${v.slice(0, 3)}-${v.slice(3)}`;
    });

    formAdicionar.addEventListener('submit', async (e) => {
        e.preventDefault();
        const alerta = $('[data-alerta]', formAdicionar);
        const erro = (msg) => { $('span', alerta).textContent = msg; alerta.hidden = false; };
        alerta.hidden = true;
        const codigo = formAdicionar.codigo.value.trim();
        if (!codigo) return erro('Digite o código do paciente.');

        const botao = $('button[type="submit"]', formAdicionar);
        ocupado(botao, true);
        try {
            const paciente = await DB.Usuarios.localizarPaciente(codigo);
            if (!paciente) throw new Error('Nenhum paciente encontrado com este código.');
            await DB.Vinculos.vincular(MID, paciente.id);
            Modal.fechar(modalAdicionar);
            toast(`${paciente.nome} foi adicionado(a) à sua lista!`);
            await carregarTudo();
            abrirPaciente(paciente.id);
        } catch (falha) {
            erro(falha.message || 'Não foi possível adicionar.');
        } finally {
            ocupado(botao, false);
        }
    });

    // ==================== ACOMPANHAR ====================
    function preencherSelecoes() {
        const select = $('#selecionarPaciente');
        limpar(select, el('option', { value: '', text: pacientes.length ? 'Selecione um paciente' : 'Nenhum paciente vinculado' }),
            pacientes.map((p) => el('option', { value: p.id, text: p.nome })));
        if (atual) select.value = atual.id;

        const filtro = $('#filtroPaciente');
        if (!filtro) return;
        const valor = filtro.value;
        limpar(filtro, el('option', { value: 'todos', text: 'Todos os pacientes' }), pacientes.map((p) => el('option', { value: p.id, text: p.nome })));
        filtro.value = pacientes.some((p) => p.id === valor) ? valor : 'todos';
    }

    $('#selecionarPaciente').addEventListener('change', (e) => {
        if (e.target.value) abrirPaciente(e.target.value);
    });

    $('#formBuscar').addEventListener('submit', async (e) => {
        e.preventDefault();
        const codigo = e.target.codigo.value.trim();
        if (!codigo) return toast('Digite o código do paciente.', 'aviso');
        const botao = $('button[type="submit"]', e.target);
        ocupado(botao, true);
        try {
            const paciente = await DB.Usuarios.localizarPaciente(codigo);
            if (!paciente) return toast('Paciente não encontrado.', 'erro');
            if (pacientes.some((p) => p.id === paciente.id)) {
                e.target.reset();
                return abrirPaciente(paciente.id);
            }
            // Não vinculado: mostra só o convite para adicionar (dados ficam protegidos).
            if (await confirmar({
                titulo: `${paciente.nome} não está na sua lista`,
                texto: 'Para ver os registros, adicione este paciente aos seus acompanhamentos.',
                botao: 'Adicionar paciente'
            })) {
                abrirAdicionar(paciente.codigo || paciente.id);
            }
        } catch (falha) {
            console.error(falha);
            toast('Não foi possível buscar agora.', 'erro');
        } finally {
            ocupado(botao, false);
        }
    });

    function abrirPaciente(id) {
        const paciente = pacientes.find((p) => p.id === id);
        if (!paciente) return toast('Este paciente não está vinculado a você.', 'erro');
        atual = paciente;
        if (mostrarSecao) mostrarSecao('acompanhar');
        $('#selecionarPaciente').value = id;
        $('#detalhe').hidden = false;
        $('#detalheVazio').hidden = true;
        desenharBanner();
        trocarAba('afetivo');
        calendario = Afetivograma.criar({ raiz: $('#calendarioPaciente'), pacienteId: id, editavel: false });
        carregarDiarioPaciente();
        carregarNotasPaciente();
    }

    function desenharBanner() {
        const r = resumos.get(atual.id) || {};
        limpar($('#bannerPaciente'),
            UI.avatar(atual, 'xl'),
            el('div', { class: 'banner-info' },
                el('h2', { text: atual.nome }),
                el('p', { text: `Acompanhado desde ${datas.desde(atual.vinculadoEm)} · ${atual.email}` }),
                el('div', { class: 'banner-tags' },
                    atual.codigo ? el('span', { class: 'code-pill' }, atual.codigo,
                        el('button', { type: 'button', title: 'Copiar código', 'aria-label': 'Copiar código', on: { click: () => UI.copiar(atual.codigo, 'Código copiado!') } }, icone('copy-outline'))) : null,
                    r.avaliacao ? badgeStatus(r.avaliacao) : null,
                    atual.telefone ? el('span', { class: 'badge neutro' }, icone('call-outline'), atual.telefone) : null
                )
            ),
            el('div', { class: 'panel-actions' },
                el('button', { class: 'btn btn-primary', type: 'button', on: { click: () => abrirAnotacao('paciente') } }, icone('create-outline'), 'Nova anotação'),
                el('button', { class: 'btn btn-danger', type: 'button', on: { click: desvincular } }, icone('person-remove-outline'), 'Desvincular')
            )
        );
    }

    async function desvincular() {
        const paciente = atual;
        if (!(await confirmar({
            titulo: `Desvincular ${paciente.nome}?`,
            texto: 'Você deixará de ver os registros deste paciente. As anotações já feitas continuam guardadas.',
            botao: 'Desvincular',
            perigo: true
        }))) return;
        try {
            await DB.Vinculos.desvincular(MID, paciente.id);
            toast(`${paciente.nome} foi removido(a) da sua lista.`);
            atual = null;
            $('#detalhe').hidden = true;
            $('#detalheVazio').hidden = false;
            await carregarTudo();
        } catch {
            toast('Não foi possível desvincular.', 'erro');
        }
    }

    // Abas
    function trocarAba(nome) {
        $$('.tab[data-tab]').forEach((t) => {
            const ativa = t.dataset.tab === nome;
            t.classList.toggle('active', ativa);
            t.setAttribute('aria-selected', String(ativa));
        });
        $$('[data-tab-panel]').forEach((p) => { p.hidden = p.dataset.tabPanel !== nome; });
        UI.animarTroca($(`[data-tab-panel="${nome}"]`));
    }

    $$('.tab[data-tab]').forEach((t) => t.addEventListener('click', () => trocarAba(t.dataset.tab)));

    async function carregarDiarioPaciente() {
        const lista = $('#diarioPaciente');
        const id = atual.id;
        limpar(lista, esqueleto(2, 90));
        try {
            const [entradas, humor] = await Promise.all([
                DB.Diario.listar(id, 50),
                DB.Afetivograma.ultimosDias(id, 120).catch(() => ({}))
            ]);
            if (!atual || atual.id !== id) return;
            limpar(lista, entradas.length
                ? UI.diarioPorDia(entradas, humor, (e) => el('article', { class: 'entry entry-row' },
                    el('div', { class: 'entry-time' }, UI.hora(e.criadoEm), e.editadoEm ? el('small', { text: 'editado' }) : null),
                    el('div', { class: 'entry-body' }, el('div', { class: 'entry-text', text: e.texto }))
                ))
                : el('div', { class: 'card' }, vazio('book-outline', 'Diário vazio', 'Este paciente ainda não escreveu no diário.')));
        } catch {
            limpar(lista, vazio('cloud-offline-outline', 'Não foi possível carregar o diário'));
        }
    }

    const fmtDataNota = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });

    function cartaoNota(a, { mostrarPaciente = false } = {}) {
        const tipo = UI.TIPOS_ANOTACAO[a.tipo] || { rotulo: a.tipo, icone: 'document-text-outline' };
        const paciente = pacientes.find((p) => p.id === a.pacienteId);

        // Lista geral: formato de prontuário (paciente, data e tipo à esquerda; texto à direita).
        if (mostrarPaciente) {
            const marcas = [
                el('span', { class: 'badge neutro', text: a.visibilidade === 'privada' ? 'Privada' : 'Visível ao paciente' }),
                a.prioridade === 'alta' ? el('span', { class: 'badge critico', text: 'Prioridade alta' }) : null,
                a.visibilidade === 'paciente' ? el('span', { class: 'note-date', text: a.lida ? 'Lida pelo paciente' : 'Ainda não lida' }) : null
            ];
            return el('article', { class: 'note note-row' },
                el('div', { class: 'note-side' },
                    paciente
                        ? el('button', { class: 'note-author-btn', type: 'button', on: { click: () => abrirPaciente(paciente.id) } }, el('strong', { text: paciente.nome }))
                        : el('strong', { text: 'Paciente' }),
                    el('small', { text: `${fmtDataNota.format(new Date(a.criadoEm)).replace(/\./g, '')}, ${UI.hora(a.criadoEm)}` }),
                    el('span', { class: 'note-type', text: tipo.rotulo })
                ),
                el('div', { class: 'note-main' },
                    el('div', { class: 'note-meta' }, marcas),
                    el('div', { class: 'note-body', text: a.conteudo }),
                    el('div', { class: 'note-foot' },
                        el('button', { class: 'btn btn-danger btn-sm', type: 'button', on: { click: () => excluirNota(a) } }, icone('trash-outline'), 'Excluir')
                    )
                )
            );
        }

        return el('article', { class: `note prioridade-${a.prioridade || 'media'}${a.visibilidade === 'privada' ? ' privada' : ''}` },
            el('div', { class: 'note-head' },
                mostrarPaciente && paciente
                    ? el('button', { class: 'note-author note-author-btn', type: 'button', on: { click: () => abrirPaciente(paciente.id) } },
                        UI.avatar(paciente, 'sm'),
                        el('div', {}, el('strong', { text: paciente.nome }), el('small', { text: datas.amigavel(a.criadoEm) })))
                    : el('span', { class: 'note-date', text: datas.amigavel(a.criadoEm) }),
                el('div', { class: 'note-meta' },
                    el('span', { class: 'badge neutro' }, icone(tipo.icone), tipo.rotulo),
                    mostrarPaciente ? el('span', { class: 'badge', text: a.visibilidade === 'privada' ? 'Privada' : 'Paciente vê' }) : null,
                    a.prioridade === 'alta' ? el('span', { class: 'badge critico', text: 'Alta' }) : null,
                    a.visibilidade === 'paciente' ? el('span', { class: 'note-date', title: a.lida ? 'O paciente já viu' : 'Ainda não vista' }, icone(a.lida ? 'checkmark-done' : 'checkmark')) : null
                )
            ),
            el('div', { class: 'note-body', text: a.conteudo }),
            el('div', { class: 'note-foot' },
                el('button', { class: 'btn btn-danger btn-sm', type: 'button', on: { click: () => excluirNota(a) } }, icone('trash-outline'), 'Excluir')
            )
        );
    }

    async function carregarNotasPaciente() {
        const id = atual.id;
        limpar($('#notasPublicas'), esqueleto(1, 90));
        limpar($('#notasPrivadas'), esqueleto(1, 90));
        try {
            const todas = (await DB.Anotacoes.listar(id)).filter((a) => a.medicoId === MID);
            if (!atual || atual.id !== id) return;
            const resumo = resumos.get(id);
            if (resumo) resumo.anotacoes = todas;
            const publicas = todas.filter((a) => a.visibilidade === 'paciente');
            const privadas = todas.filter((a) => a.visibilidade === 'privada');
            limpar($('#notasPublicas'), publicas.length ? publicas.map((a) => cartaoNota(a)) : el('p', { class: 'muted', text: 'Nenhuma anotação para o paciente.' }));
            limpar($('#notasPrivadas'), privadas.length ? privadas.map((a) => cartaoNota(a)) : el('p', { class: 'muted', text: 'Nenhuma anotação privada.' }));
        } catch {
            toast('Não foi possível carregar as anotações.', 'erro');
        }
    }

    async function excluirNota(a) {
        if (!(await confirmar({ titulo: 'Excluir esta anotação?', texto: a.visibilidade === 'paciente' ? 'Ela também some da área do paciente.' : 'Esta ação não pode ser desfeita.', botao: 'Excluir', perigo: true }))) return;
        try {
            await DB.Anotacoes.excluir(a.pacienteId, a.id);
            const resumo = resumos.get(a.pacienteId);
            if (resumo) resumo.anotacoes = resumo.anotacoes.filter((n) => n.id !== a.id);
            if (atual && atual.id === a.pacienteId) carregarNotasPaciente();
            desenharAnotacoesGerais();
            desenharPainel();
            toast('Anotação excluída.');
        } catch {
            toast('Não foi possível excluir.', 'erro');
        }
    }

    // Nova anotação
    const modalAnotacao = $('#modalAnotacao');
    const formAnotacao = $('#formAnotacao');
    UI.contador(formAnotacao.conteudo, $('#contadorAnotacao'));

    function abrirAnotacao(visibilidade = 'paciente') {
        if (!atual) return toast('Selecione um paciente primeiro.', 'aviso');
        formAnotacao.reset();
        $(`input[name="visibilidade"][value="${visibilidade}"]`, formAnotacao).checked = true;
        $('[data-alerta]', formAnotacao).hidden = true;
        $('#subtituloAnotacao').textContent = `Paciente: ${atual.nome}`;
        formAnotacao.conteudo.dispatchEvent(new Event('input'));
        Modal.abrir(modalAnotacao);
    }

    $$('[data-nova-anotacao]').forEach((b) => b.addEventListener('click', () => abrirAnotacao(b.dataset.novaAnotacao)));

    formAnotacao.addEventListener('submit', async (e) => {
        e.preventDefault();
        const conteudo = formAnotacao.conteudo.value.trim();
        if (!conteudo) {
            const alerta = $('[data-alerta]', formAnotacao);
            $('span', alerta).textContent = 'Escreva o conteúdo da anotação.';
            alerta.hidden = false;
            return formAnotacao.conteudo.focus();
        }
        const botao = $('button[type="submit"]', formAnotacao);
        ocupado(botao, true);
        try {
            await DB.Anotacoes.criar(atual.id, MID, {
                tipo: formAnotacao.tipo.value,
                visibilidade: formAnotacao.visibilidade.value,
                prioridade: formAnotacao.prioridade.value,
                conteudo
            });
            Modal.fechar(modalAnotacao);
            toast(formAnotacao.visibilidade.value === 'paciente' ? 'Anotação enviada ao paciente!' : 'Anotação privada salva!');
            trocarAba('notas');
            await carregarNotasPaciente();
            desenharAnotacoesGerais();
            desenharPainel();
        } catch (erro) {
            console.error(erro);
            toast('Não foi possível salvar a anotação.', 'erro');
        } finally {
            ocupado(botao, false);
        }
    });

    // ==================== ANOTAÇÕES GERAIS ====================
    function desenharAnotacoesGerais() {
        if (!$('#listaAnotacoesGerais')) return; // aba removida: anotações ficam no Acompanhar
        const vis = $('#filtroVisibilidade').value;
        const tipo = $('#filtroTipo').value;
        const pac = $('#filtroPaciente').value;
        const todas = [];
        resumos.forEach((r, pid) => {
            if (pacientes.some((p) => p.id === pid)) todas.push(...r.anotacoes);
        });
        const filtradas = todas
            .filter((a) => (vis === 'todas' || a.visibilidade === vis) && (tipo === 'todos' || a.tipo === tipo) && (pac === 'todos' || a.pacienteId === pac))
            .sort((a, b) => b.criadoEm - a.criadoEm);

        limpar($('#listaAnotacoesGerais'), filtradas.length
            ? filtradas.map((a) => cartaoNota(a, { mostrarPaciente: true }))
            : el('div', { class: 'card' }, vazio('document-text-outline',
                todas.length ? 'Nenhuma anotação com esses filtros' : 'Nenhuma anotação ainda',
                todas.length ? 'Tente outros filtros.' : 'Abra um paciente em “Acompanhar” para escrever a primeira.')));
    }

    ['#filtroVisibilidade', '#filtroTipo', '#filtroPaciente'].forEach((s) => $(s) && $(s).addEventListener('change', desenharAnotacoesGerais));

    // ==================== INÍCIO ====================
    mostrarSecao = UI.navegacao();

    (async () => {
        try {
            if (!(await carregarMedico())) return;
        } catch (erro) {
            console.error(erro);
            toast('Não foi possível carregar seus dados. Verifique a conexão.', 'erro');
        }
        await carregarTudo();
    })();
})();
