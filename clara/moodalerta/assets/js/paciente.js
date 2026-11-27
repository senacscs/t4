/* =========================================================
   MoodAlert · Área do paciente
   Afetivograma, diário, alarmes, anotações e perfil.
   ========================================================= */
(function () {
    'use strict';

    const sessao = Auth.exigir('paciente');
    if (!sessao) return;

    const { $, $$, el, icone, limpar, datas, toast, Modal, ocupado, confirmar, vazio, esqueleto } = UI;
    const PID = sessao.uid;

    let usuario = { id: PID, nome: sessao.nome, tipo: 'paciente' };
    let medico = null;
    let perfil = null;

    // ==================== CABEÇALHO E PERFIL ====================
    function atualizarCabecalho() {
        $('#userNome').textContent = usuario.nome;
        UI.preencherAvatar($('#userAvatar'), usuario);
        $('#sidebarCodigo').textContent = usuario.codigo || '—';
        const primeiroNome = usuario.nome.split(' ')[0];
        const hora = new Date().getHours();
        const cumprimento = hora < 12 ? 'Bom dia' : hora < 18 ? 'Boa tarde' : 'Boa noite';
        const data = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
        $('#saudacao').textContent = `${cumprimento}, ${primeiroNome} · ${data}`;
    }

    function blocoMedico() {
        const secao = el('section', { class: 'perfil-section' }, el('h4', { text: 'Médico responsável' }));
        if (medico) {
            secao.append(el('div', { class: 'doctor-card' },
                UI.avatar(medico, 'lg'),
                el('div', {},
                    el('strong', { text: UI.tituloMedico(medico) }),
                    el('small', { text: [medico.especialidade || 'Médico', medico.crm ? `CRM ${medico.crm}` : ''].filter(Boolean).join(' · ') })
                )
            ));
        } else {
            secao.append(el('p', { class: 'muted', text: 'Você ainda não está vinculado a um médico. Passe o seu código para ele adicionar você.' }));
        }
        return secao;
    }

    async function carregarUsuario() {
        try {
            const dados = await DB.Usuarios.buscar(PID);
            if (!dados) {
                toast('Sua conta não foi encontrada.', 'erro');
                return setTimeout(Auth.sair, 1500);
            }
            usuario = dados;
            atualizarCabecalho();
            perfil = Perfil.iniciar({
                usuario,
                extra: blocoMedico,
                aoAtualizar: (novo) => { usuario = novo; atualizarCabecalho(); }
            });
        } catch (erro) {
            console.error(erro);
            toast('Não foi possível carregar seus dados. Verifique a conexão.', 'erro');
        }
    }

    const abrirPerfil = () => perfil && perfil.abrir();
    $('#userChip').addEventListener('click', abrirPerfil);
    $('#userChip').addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); abrirPerfil(); } });

    $('#btnSair').addEventListener('click', async () => {
        if (await confirmar({ titulo: 'Sair da conta?', texto: 'Você precisará entrar de novo para acessar seus registros.', botao: 'Sair' })) Auth.sair();
    });

    // ==================== AFETIVOGRAMA ====================
    const modalDia = $('#modalDia');
    const formDia = $('#formDia');
    let diaEditando = null;

    limpar($('#opcoesEmocao'), UI.EMOCOES.map((e) =>
        el('label', { class: 'choice' },
            el('input', { type: 'radio', name: 'emocao', value: e.valor }),
            el('span', { text: e.valor })
        )
    ));

    const calendario = Afetivograma.criar({
        raiz: $('#calendario'),
        pacienteId: PID,
        editavel: true,
        aoClicarDia: abrirDia,
        aoResumir: desenharHoje,
        resumoRaiz: $('#resumoMes')
    });

    /** Quadro "Hoje": emoção registrada, horário e dias consecutivos. */
    function desenharHoje({ hoje, sequencia }) {
        const titulo = $('#hojeTitulo');
        const partes = [];
        if (hoje) {
            const intensidade = (UI.INTENSIDADES[hoje.intensidade] || '').toLowerCase();
            limpar(titulo, el('span', { class: `status-dot ${hoje.intensidade}`, 'aria-hidden': 'true' }), `${hoje.emocao}, intensidade ${intensidade}`);
            if (hoje.registradoEm) partes.push(`Registrado às ${new Date(hoje.registradoEm).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`);
            $('#hojeBotao').textContent = 'Editar registro de hoje';
            $('#btnRegistrarHoje').className = 'btn btn-ghost';
        } else {
            limpar(titulo, el('span', { class: 'status-dot vazio', 'aria-hidden': 'true' }), 'Sem registro');
            $('#hojeBotao').textContent = 'Registrar hoje';
            $('#btnRegistrarHoje').className = 'btn btn-primary';
        }
        if (sequencia >= 2) partes.push(`${sequencia} dias consecutivos com registro`);
        // Registro rápido: escolher a emoção aqui já abre o formulário com ela marcada.
        $('#hojeRapido').hidden = !!hoje;
        if (!hoje && !$('#hojeOpcoes').childElementCount) {
            limpar($('#hojeOpcoes'), UI.EMOCOES.map((e) => el('button', {
                class: 'quick-btn', type: 'button', text: e.valor,
                on: { click: () => abrirDia(new Date(), null, e.valor) }
            })));
        }
        $('#hojeTexto').textContent = partes.join(' · ');
        $('#hojeTexto').hidden = !partes.length;
    }

    function abrirDia(data, registro, emocaoInicial) {
        diaEditando = data;
        formDia.reset();
        $('[data-alerta]', formDia).hidden = true;
        const ehHoje = data.toDateString() === new Date().toDateString();
        $('#tituloDia').textContent = ehHoje
            ? 'Hoje'
            : data.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
        if (registro) {
            const emocao = $(`input[name="emocao"][value="${registro.emocao}"]`, formDia);
            if (emocao) emocao.checked = true;
            const intensidade = $(`input[name="intensidade"][value="${registro.intensidade}"]`, formDia);
            if (intensidade) intensidade.checked = true;
            formDia.observacoes.value = registro.observacoes || '';
        }
        if (!registro && emocaoInicial) {
            const marcar = $(`input[name="emocao"][value="${emocaoInicial}"]`, formDia);
            if (marcar) marcar.checked = true;
        }
        $('#btnApagarDia').hidden = !registro;
        Modal.abrir(modalDia);
    }

    $('#btnRegistrarHoje').addEventListener('click', async () => {
        const hoje = new Date();
        let registro = null;
        try {
            registro = (await DB.Afetivograma.mes(PID, hoje.getFullYear(), hoje.getMonth() + 1))[hoje.getDate()] || null;
        } catch { /* abre vazio */ }
        abrirDia(hoje, registro);
    });

    formDia.addEventListener('submit', async (e) => {
        e.preventDefault();
        const emocao = formDia.emocao.value;
        const intensidade = formDia.intensidade.value;
        const alerta = $('[data-alerta]', formDia);
        if (!emocao || !intensidade) {
            $('span', alerta).textContent = !emocao ? 'Escolha a emoção principal.' : 'Escolha a intensidade.';
            alerta.hidden = false;
            return;
        }
        const botao = $('button[type="submit"]', formDia);
        ocupado(botao, true);
        try {
            const registro = { emocao, intensidade, observacoes: formDia.observacoes.value.trim() };
            await DB.Afetivograma.salvar(PID, diaEditando, registro);
            calendario.definirDia(diaEditando, { ...registro, registradoEm: Date.now() });
            Modal.fechar(modalDia);
            toast('Registro salvo no afetivograma!');
        } catch (erro) {
            console.error(erro);
            toast('Não foi possível salvar. Tente de novo.', 'erro');
        } finally {
            ocupado(botao, false);
        }
    });

    $('#btnApagarDia').addEventListener('click', async () => {
        const data = diaEditando;
        Modal.fechar(modalDia);
        if (!(await confirmar({ titulo: 'Apagar este registro?', texto: 'A emoção e as observações deste dia serão removidas.', botao: 'Apagar', perigo: true }))) return;
        try {
            await DB.Afetivograma.remover(PID, data);
            calendario.definirDia(data, null);
            toast('Registro apagado.');
        } catch {
            toast('Não foi possível apagar.', 'erro');
        }
    });

    // ==================== DIÁRIO ====================
    const formDiario = $('#formDiario');
    const listaDiario = $('#listaDiario');
    const atualizarContador = UI.contador($('#diarioTexto'), $('#diarioContador'));
    let diario = [];

    const buscaDiario = $('#buscaDiario');
    let humorDiario = {}; // humor do afetivograma por data, para o cabeçalho de cada dia

    function desenharResumoDiario() {
        const agora = new Date();
        const doMes = diario.filter((e) => {
            const d = new Date(e.criadoEm);
            return d.getMonth() === agora.getMonth() && d.getFullYear() === agora.getFullYear();
        }).length;
        const linha = (rotulo, valor) => [el('dt', { text: rotulo }), el('dd', { text: valor })];
        limpar($('#diarioResumo'),
            linha('Registros', String(diario.length)),
            linha('Neste mês', String(doMes)),
            linha('Último registro', diario.length ? datas.relativo(diario[0].criadoEm) : '—')
        );
    }

    function desenharDiario() {
        desenharResumoDiario();
        const total = $('#diarioTotal');
        total.textContent = diario.length ? String(diario.length) : '';
        if (!diario.length) {
            return limpar(listaDiario, el('div', { class: 'card' },
                vazio('book-outline', 'Nenhum registro ainda', 'Escreva sobre o seu dia no campo acima.')));
        }
        const termo = buscaDiario.value.trim().toLowerCase();
        const filtrados = termo ? diario.filter((e) => e.texto.toLowerCase().includes(termo)) : diario;
        if (!filtrados.length) {
            return limpar(listaDiario, el('div', { class: 'card' },
                vazio('search-outline', 'Nada encontrado', `Nenhum registro com “${buscaDiario.value.trim()}”.`)));
        }
        limpar(listaDiario, UI.diarioPorDia(filtrados, humorDiario, cartaoDiario));
    }

    function cartaoDiario(entrada) {
        const texto = el('div', { class: 'entry-text', text: entrada.texto });
        const corpo = el('div', { class: 'entry-body' }, texto);
        const acoes = el('div', { class: 'entry-actions' },
            el('button', {
                class: 'icon-btn', type: 'button', title: 'Editar registro', 'aria-label': 'Editar registro',
                on: { click: () => editar() }
            }, icone('create-outline')),
            el('button', {
                class: 'icon-btn danger', type: 'button', title: 'Excluir registro', 'aria-label': 'Excluir registro',
                on: { click: () => excluirDiario(entrada) }
            }, icone('trash-outline'))
        );
        const artigo = el('article', { class: 'entry entry-row' },
            el('div', { class: 'entry-time' }, UI.hora(entrada.criadoEm),
                entrada.editadoEm ? el('small', { text: 'editado' }) : null),
            corpo,
            acoes
        );

        function editar() {
            const campo = el('textarea', { class: 'input entry-edit', maxlength: '1200', 'aria-label': 'Editar registro' });
            campo.value = entrada.texto;
            const salvar = el('button', { class: 'btn btn-primary btn-sm', type: 'button', text: 'Salvar' });
            const cancelar = el('button', { class: 'btn btn-ghost btn-sm', type: 'button', text: 'Cancelar' });
            texto.replaceWith(campo);
            acoes.hidden = true;
            corpo.append(el('div', { class: 'entry-edit-bar' }, cancelar, salvar));
            campo.focus();
            campo.setSelectionRange(campo.value.length, campo.value.length);

            cancelar.addEventListener('click', desenharDiario);
            salvar.addEventListener('click', async () => {
                const novo = campo.value.trim();
                if (!novo) return toast('O registro não pode ficar vazio.', 'aviso');
                ocupado(salvar, true);
                try {
                    await DB.Diario.atualizar(PID, entrada.id, novo);
                    entrada.texto = novo;
                    entrada.editadoEm = Date.now();
                    desenharDiario();
                    toast('Registro atualizado!');
                } catch (erro) {
                    console.error(erro);
                    toast('Não foi possível salvar a edição.', 'erro');
                    ocupado(salvar, false);
                }
            });
        }

        return artigo;
    }

    buscaDiario.addEventListener('input', desenharDiario);

    async function carregarDiario() {
        limpar(listaDiario, esqueleto(2, 90));
        try {
            [diario, humorDiario] = await Promise.all([
                DB.Diario.listar(PID, 100),
                DB.Afetivograma.ultimosDias(PID, 120).catch(() => ({}))
            ]);
            desenharDiario();
        } catch (erro) {
            console.error(erro);
            limpar(listaDiario, vazio('cloud-offline-outline', 'Não foi possível carregar o diário', 'Verifique sua conexão e recarregue a página.'));
        }
    }

    formDiario.addEventListener('submit', async (e) => {
        e.preventDefault();
        const texto = formDiario.texto.value.trim();
        if (!texto) {
            formDiario.texto.focus();
            return toast('Escreva algo antes de salvar.', 'aviso');
        }
        const botao = $('button[type="submit"]', formDiario);
        ocupado(botao, true);
        try {
            const novo = await DB.Diario.criar(PID, texto);
            diario.unshift(novo);
            desenharDiario();
            formDiario.reset();
            atualizarContador();
            toast('Registro salvo no diário!');
        } catch (erro) {
            console.error(erro);
            toast('Não foi possível salvar o registro.', 'erro');
        } finally {
            ocupado(botao, false);
        }
    });

    async function excluirDiario(entrada) {
        if (!(await confirmar({ titulo: 'Excluir este registro?', texto: 'Esta ação não pode ser desfeita.', botao: 'Excluir', perigo: true }))) return;
        try {
            await DB.Diario.excluir(PID, entrada.id);
            diario = diario.filter((d) => d.id !== entrada.id);
            desenharDiario();
            toast('Registro excluído.');
        } catch {
            toast('Não foi possível excluir.', 'erro');
        }
    }

    // ==================== ALARMES ====================
    const modalAlarme = $('#modalAlarme');
    const formAlarme = $('#formAlarme');
    const listaAlarmes = $('#listaAlarmes');
    let alarmes = [];
    let alarmeEditando = null;

    function descreverDias(dias) {
        const s = [...dias].sort().join(',');
        if (s === '0,1,2,3,4,5,6') return 'Todos os dias';
        if (s === '1,2,3,4,5') return 'Dias úteis';
        if (s === '0,6') return 'Fins de semana';
        return dias.map((d) => UI.DIAS_CURTOS[d]).join(', ');
    }

    /** Data do próximo disparo de um alarme ligado (ou null). */
    function proximaData(alarme) {
        if (!alarme.ativo || !alarme.dias.length) return null;
        const agora = new Date();
        const [h, m] = alarme.horario.split(':').map(Number);
        for (let i = 0; i < 8; i++) {
            const d = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate() + i, h, m);
            if (d > agora && alarme.dias.includes(d.getDay())) return d;
        }
        return null;
    }

    /** "hoje", "amanhã" ou o dia da semana. */
    function quandoTexto(d) {
        const hoje = new Date();
        const dias = Math.round((new Date(d.getFullYear(), d.getMonth(), d.getDate()) - new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate())) / 86400000);
        return dias === 0 ? 'hoje' : dias === 1 ? 'amanhã' : d.toLocaleDateString('pt-BR', { weekday: 'long' });
    }

    /** "em 2 h 15 min" */
    function faltaTexto(d) {
        const min = Math.max(1, Math.round((d - Date.now()) / 60000));
        if (min < 60) return `em ${min} min`;
        const h = Math.floor(min / 60);
        const resto = min % 60;
        if (h < 24) return resto ? `em ${h} h ${resto} min` : `em ${h} h`;
        const dias = Math.round(h / 24);
        return `em ${dias} ${dias === 1 ? 'dia' : 'dias'}`;
    }

    function periodo(horario) {
        const h = Number(horario.slice(0, 2));
        return h < 12 ? 'Manhã' : h < 18 ? 'Tarde' : 'Noite';
    }

    function desenharProximo() {
        const caixa = $('#proximoAlarme');
        const proximos = alarmes.map((a) => ({ a, d: proximaData(a) })).filter((x) => x.d).sort((x, y) => x.d - y.d);
        caixa.hidden = !proximos.length;
        if (!proximos.length) return;
        const { a, d } = proximos[0];
        limpar(caixa,
            el('div', { class: 'next-icon', 'aria-hidden': 'true' }, icone('alarm-outline')),
            el('div', { class: 'next-text' },
                el('span', { text: 'Próximo lembrete' }),
                el('strong', { text: `${a.nome} · ${quandoTexto(d)} às ${a.horario}` })
            ),
            el('span', { class: 'next-falta', text: faltaTexto(d) })
        );
    }

    function linhaAlarme(alarme) {
        const chave = el('input', { type: 'checkbox', 'aria-label': `Alarme ${alarme.nome} ${alarme.ativo ? 'ligado' : 'desligado'}` });
        chave.checked = !!alarme.ativo;
        chave.addEventListener('change', () => alternarAlarme(alarme, chave.checked));
        const d = proximaData(alarme);

        return el('article', { class: `alarm-row${alarme.ativo ? '' : ' off'}` },
            el('div', { class: 'alarm-time', text: alarme.horario }),
            el('div', { class: 'alarm-info' },
                el('strong', { text: alarme.nome }),
                el('span', { text: alarme.observacoes || (d ? `Próximo: ${quandoTexto(d)}` : 'Desligado') })
            ),
            el('div', { class: 'alarm-days', title: descreverDias(alarme.dias), 'aria-label': descreverDias(alarme.dias) },
                ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((letra, i) => el('span', { class: alarme.dias.includes(i) ? 'on' : '', text: letra }))
            ),
            el('label', { class: 'switch', title: alarme.ativo ? 'Desligar' : 'Ligar' }, chave, el('span')),
            el('div', { class: 'alarm-actions' },
                el('button', { class: 'icon-btn', type: 'button', title: 'Testar som', 'aria-label': `Testar som do alarme ${alarme.nome}`, on: { click: tocarSom } }, icone('volume-medium-outline')),
                el('button', { class: 'icon-btn', type: 'button', title: 'Editar alarme', 'aria-label': `Editar alarme ${alarme.nome}`, on: { click: () => abrirAlarme(alarme) } }, icone('create-outline')),
                el('button', { class: 'icon-btn danger', type: 'button', title: 'Excluir alarme', 'aria-label': `Excluir alarme ${alarme.nome}`, on: { click: () => excluirAlarme(alarme) } }, icone('trash-outline'))
            )
        );
    }

    function desenharAlarmes() {
        desenharProximo();
        if (!alarmes.length) {
            return limpar(listaAlarmes, el('div', { class: 'card' },
                vazio('alarm-outline', 'Nenhum alarme configurado', 'Crie lembretes para medicações e hábitos importantes da sua rotina.')));
        }
        // Já vêm ordenados por horário; agrupa em Manhã, Tarde e Noite.
        const itens = [];
        let atual = '';
        alarmes.forEach((alarme) => {
            const p = periodo(alarme.horario);
            if (p !== atual) {
                atual = p;
                itens.push(el('div', { class: 'list-group', text: p }));
            }
            itens.push(linhaAlarme(alarme));
        });
        limpar(listaAlarmes, itens);
    }

    async function carregarAlarmes() {
        limpar(listaAlarmes, esqueleto(2, 180));
        try {
            alarmes = await DB.Alarmes.listar(PID);
            desenharAlarmes();
        } catch (erro) {
            console.error(erro);
            limpar(listaAlarmes, vazio('cloud-offline-outline', 'Não foi possível carregar os alarmes'));
        }
    }

    function abrirAlarme(alarme = null) {
        alarmeEditando = alarme;
        formAlarme.reset();
        $('[data-alerta]', formAlarme).hidden = true;
        $('#tituloAlarme').textContent = alarme ? 'Editar alarme' : 'Novo alarme';
        if (alarme) {
            formAlarme.nome.value = alarme.nome;
            formAlarme.horario.value = alarme.horario;
            formAlarme.observacoes.value = alarme.observacoes || '';
            $$('input[name="dias"]', formAlarme).forEach((c) => { c.checked = alarme.dias.includes(Number(c.value)); });
        }
        Modal.abrir(modalAlarme);
    }

    $('#btnNovoAlarme').addEventListener('click', () => abrirAlarme());

    $$('.chip-btn[data-dias]', formAlarme).forEach((botao) => {
        botao.addEventListener('click', () => {
            const dias = botao.dataset.dias.split(',');
            $$('input[name="dias"]', formAlarme).forEach((c) => { c.checked = dias.includes(c.value); });
        });
    });

    formAlarme.addEventListener('submit', async (e) => {
        e.preventDefault();
        const alerta = $('[data-alerta]', formAlarme);
        const dias = $$('input[name="dias"]:checked', formAlarme).map((c) => Number(c.value));
        const nome = formAlarme.nome.value.trim();
        const horario = formAlarme.horario.value;
        const problema = !nome ? 'Dê um título ao lembrete.' : !horario ? 'Escolha o horário.' : !dias.length ? 'Selecione pelo menos um dia da semana.' : '';
        if (problema) {
            $('span', alerta).textContent = problema;
            alerta.hidden = false;
            return;
        }
        const botao = $('button[type="submit"]', formAlarme);
        ocupado(botao, true);
        try {
            await DB.Alarmes.salvar(PID, alarmeEditando && alarmeEditando.id, { nome, horario, dias, observacoes: formAlarme.observacoes.value });
            Modal.fechar(modalAlarme);
            toast(alarmeEditando ? 'Alarme atualizado!' : 'Alarme criado!');
            await carregarAlarmes();
            pedirPermissaoSePreciso();
        } catch (erro) {
            console.error(erro);
            toast('Não foi possível salvar o alarme.', 'erro');
        } finally {
            ocupado(botao, false);
        }
    });

    async function alternarAlarme(alarme, ativo) {
        try {
            await DB.Alarmes.alternar(PID, alarme.id, ativo);
            alarme.ativo = ativo;
            desenharAlarmes();
            toast(ativo ? 'Alarme ligado.' : 'Alarme desligado.');
        } catch {
            toast('Não foi possível alterar o alarme.', 'erro');
            desenharAlarmes();
        }
    }

    async function excluirAlarme(alarme) {
        if (!(await confirmar({ titulo: `Excluir “${alarme.nome}”?`, texto: 'O lembrete deixará de tocar.', botao: 'Excluir', perigo: true }))) return;
        try {
            await DB.Alarmes.excluir(PID, alarme.id);
            alarmes = alarmes.filter((a) => a.id !== alarme.id);
            desenharAlarmes();
            toast('Alarme excluído.');
        } catch {
            toast('Não foi possível excluir.', 'erro');
        }
    }

    // Disparo dos alarmes enquanto a página está aberta
    const disparados = new Set();
    const banner = $('#bannerNotificacao');

    function atualizarBanner() {
        banner.hidden = !('Notification' in window) || Notification.permission !== 'default' || !alarmes.some((a) => a.ativo);
    }

    function pedirPermissaoSePreciso() {
        atualizarBanner();
    }

    $('#btnPermitirNotificacao').addEventListener('click', async () => {
        try { await Notification.requestPermission(); } catch { /* navegador antigo */ }
        atualizarBanner();
    });

    function tocarSom() {
        try {
            const Ctx = window.AudioContext || window.webkitAudioContext;
            const ctx = new Ctx();
            [0, 0.35, 0.7].forEach((t) => {
                const osc = ctx.createOscillator();
                const ganho = ctx.createGain();
                osc.frequency.value = 880;
                ganho.gain.setValueAtTime(0.0001, ctx.currentTime + t);
                ganho.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + t + 0.02);
                ganho.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + t + 0.28);
                osc.connect(ganho).connect(ctx.destination);
                osc.start(ctx.currentTime + t);
                osc.stop(ctx.currentTime + t + 0.3);
            });
        } catch { /* sem áudio */ }
    }

    function verificarAlarmes() {
        const agora = new Date();
        const hhmm = `${String(agora.getHours()).padStart(2, '0')}:${String(agora.getMinutes()).padStart(2, '0')}`;
        const chaveMinuto = `${DB.chaveData(agora)} ${hhmm}`;
        alarmes.forEach((alarme) => {
            const id = `${alarme.id}@${chaveMinuto}`;
            if (!alarme.ativo || alarme.horario !== hhmm || !alarme.dias.includes(agora.getDay()) || disparados.has(id)) return;
            disparados.add(id);
            toast(`${alarme.nome}${alarme.observacoes ? ` — ${alarme.observacoes}` : ''}`, 'aviso');
            tocarSom();
            if ('Notification' in window && Notification.permission === 'granted') {
                try { new Notification(`MoodAlert · ${alarme.nome}`, { body: alarme.observacoes || `Lembrete das ${alarme.horario}`, icon: 'assets/img/icone.svg' }); } catch { /* ignore */ }
            }
        });
    }

    setInterval(verificarAlarmes, 15000);
    // Mantém o "Próximo: ..." dos cartões em dia (sem mexer se o usuário estiver interagindo).
    setInterval(() => {
        if (alarmes.length && !listaAlarmes.contains(document.activeElement)) desenharAlarmes();
    }, 60000);

    // ==================== ANOTAÇÕES ====================
    const listaAnotacoes = $('#listaAnotacoes');
    let anotacoes = [];

    function desenharCardMedico() {
        const area = $('#cardMedico');
        if (!medico) {
            return limpar(area,
                el('p', { class: 'side-note', text: 'Você ainda não tem um médico vinculado. Informe o seu código para ele adicionar você.' }),
                usuario.codigo ? el('button', { class: 'btn btn-ghost btn-sm', type: 'button', style: 'margin-top:.6rem', text: `Copiar código ${usuario.codigo}`, on: { click: () => UI.copiar(usuario.codigo, 'Código copiado!') } }) : null
            );
        }
        const linha = (rotulo, valor) => [el('dt', { text: rotulo }), el('dd', { text: valor })];
        limpar(area,
            el('div', { class: 'doctor-line' },
                UI.avatar(medico),
                el('div', {},
                    el('strong', { text: UI.tituloMedico(medico) }),
                    el('small', { text: medico.especialidade || 'Médico' })
                )
            ),
            el('dl', { class: 'summary-list', style: 'margin-top:.85rem' },
                medico.crm ? linha('CRM', medico.crm) : null,
                linha('Acompanha desde', datas.desde(medico.desde))
            )
        );
    }

    const fmtDataNota = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });

    function desenharAnotacoes() {
        const naoLidas = anotacoes.filter((a) => !a.lida).length;
        const contador = $('#contadorAnotacoes');
        contador.hidden = !naoLidas;
        contador.textContent = naoLidas;

        const linha = (rotulo, valor) => [el('dt', { text: rotulo }), el('dd', { text: valor })];
        limpar($('#notasResumo'),
            linha('Anotações', String(anotacoes.length)),
            linha('Não lidas', String(naoLidas)),
            linha('Última', anotacoes.length ? datas.relativo(anotacoes[0].criadoEm) : '—')
        );

        if (!anotacoes.length) {
            return limpar(listaAnotacoes, el('div', { class: 'card' },
                vazio('clipboard-outline', 'Nenhuma anotação ainda', 'Quando seu médico enviar orientações, elas aparecem aqui.')));
        }

        limpar(listaAnotacoes, anotacoes.map((a) => {
            const tipo = UI.TIPOS_ANOTACAO[a.tipo] || { rotulo: a.tipo };
            const marcas = [
                a.lida ? null : el('span', { class: 'badge', text: 'Nova' }),
                a.prioridade === 'alta' ? el('span', { class: 'badge critico', text: 'Prioridade alta' }) : null
            ].filter(Boolean);
            return el('article', { class: `note note-row${a.lida ? '' : ' nova'}` },
                el('div', { class: 'note-side' },
                    el('strong', { text: fmtDataNota.format(new Date(a.criadoEm)).replace(/\./g, '') }),
                    el('small', { text: UI.hora(a.criadoEm) }),
                    el('span', { class: 'note-type', text: tipo.rotulo })
                ),
                el('div', { class: 'note-main' },
                    marcas.length ? el('div', { class: 'note-meta' }, marcas) : null,
                    el('div', { class: 'note-body', text: a.conteudo })
                )
            );
        }));
    }

    async function carregarAnotacoes() {
        limpar(listaAnotacoes, esqueleto(2, 110));
        try {
            [medico, anotacoes] = await Promise.all([
                DB.Vinculos.medicoDoPaciente(PID),
                DB.Anotacoes.listar(PID, { somentePaciente: true })
            ]);
            desenharCardMedico();
            desenharAnotacoes();
            if (perfil) perfil.redesenhar();
        } catch (erro) {
            console.error(erro);
            limpar(listaAnotacoes, vazio('cloud-offline-outline', 'Não foi possível carregar as anotações'));
        }
    }

    /** Ao abrir a aba, marca as novas como lidas (o destaque some na próxima visita). */
    async function marcarComoLidas() {
        const ids = anotacoes.filter((a) => !a.lida).map((a) => a.id);
        if (!ids.length) return;
        try {
            await DB.Anotacoes.marcarLidas(PID, ids);
            setTimeout(() => {
                anotacoes.forEach((a) => { a.lida = true; });
                $('#contadorAnotacoes').hidden = true;
            }, 4000);
        } catch { /* tenta de novo na próxima */ }
    }

    // ==================== INÍCIO ====================
    UI.navegacao((secao) => { if (secao === 'anotacoes') marcarComoLidas(); });

    (async () => {
        await carregarUsuario();
        await Promise.all([carregarDiario(), carregarAlarmes(), carregarAnotacoes()]);
        atualizarBanner();
        verificarAlarmes();
        if (location.hash === '#anotacoes') marcarComoLidas();
    })();
})();
