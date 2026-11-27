/* =========================================================
   MoodAlert · Utilitários de interface
   Tema, criação segura de elementos (sem innerHTML com dados
   do usuário), modais, avisos, datas e textos fixos.
   Carregado no <head> para aplicar o tema sem "piscar".
   ========================================================= */
(function () {
    'use strict';

    // ---------- Tema (claro é o padrão) ----------
    const CHAVE_TEMA = 'moodalert-tema';

    const lerTema = () => {
        try { return localStorage.getItem(CHAVE_TEMA) === 'dark' ? 'dark' : 'light'; } catch { return 'light'; }
    };

    function aplicarTema(tema) {
        document.documentElement.setAttribute('data-theme', tema);
        document.querySelectorAll('[data-tema-opcao]').forEach((btn) => {
            const ativo = btn.dataset.temaOpcao === tema;
            btn.classList.toggle('active', ativo);
            btn.setAttribute('aria-pressed', String(ativo));
        });
        document.querySelectorAll('[data-tema-toggle]').forEach((btn) => {
            const icone = btn.querySelector('ion-icon');
            if (icone) icone.setAttribute('name', tema === 'dark' ? 'sunny-outline' : 'moon-outline');
            const rotulo = tema === 'dark' ? 'Usar tema claro' : 'Usar tema escuro';
            btn.title = rotulo;
            btn.setAttribute('aria-label', rotulo);
        });
    }

    function definirTema(tema) {
        try { localStorage.setItem(CHAVE_TEMA, tema); } catch { /* sem armazenamento */ }
        aplicarTema(tema);
    }

    aplicarTema(lerTema());

    // ---------- Seletores e criação de elementos ----------
    const $ = (seletor, raiz = document) => raiz.querySelector(seletor);
    const $$ = (seletor, raiz = document) => Array.from(raiz.querySelectorAll(seletor));

    /**
     * el('div', { class: 'x', text: 'oi', on: { click: fn } }, filho1, 'texto')
     * Textos sempre entram como texto puro (seguro contra XSS).
     */
    function el(tag, props = {}, ...filhos) {
        const no = document.createElement(tag);
        Object.entries(props || {}).forEach(([chave, valor]) => {
            if (valor === null || valor === undefined || valor === false) return;
            if (chave === 'class') no.className = valor;
            else if (chave === 'text') no.textContent = valor;
            else if (chave === 'dataset') Object.assign(no.dataset, valor);
            else if (chave === 'on') Object.entries(valor).forEach(([evt, fn]) => no.addEventListener(evt, fn));
            else if (chave === 'style') no.style.cssText = valor;
            else if (valor === true) no.setAttribute(chave, '');
            else no.setAttribute(chave, valor);
        });
        filhos.flat().forEach((filho) => {
            if (filho === null || filho === undefined || filho === false) return;
            no.append(filho instanceof Node ? filho : document.createTextNode(String(filho)));
        });
        return no;
    }

    const icone = (nome) => el('ion-icon', { name: nome, 'aria-hidden': 'true' });

    function limpar(no, ...filhos) {
        no.replaceChildren(...filhos.flat().filter(Boolean));
        return no;
    }

    // ---------- Textos e rótulos do domínio ----------
    const EMOCOES = [
        { valor: 'Tranquila', emoji: '😌' },
        { valor: 'Neutra', emoji: '😐' },
        { valor: 'Animada', emoji: '😄' },
        { valor: 'Ansiosa', emoji: '😟' },
        { valor: 'Irritada', emoji: '😠' }
    ];

    const INTENSIDADES = {
        leve: 'Leve',
        neutro: 'Neutro',
        elevada: 'Elevada',
        critica: 'Crítica'
    };

    const TIPOS_ANOTACAO = {
        orientacao: { rotulo: 'Orientação', icone: 'compass-outline' },
        observacao: { rotulo: 'Observação', icone: 'eye-outline' },
        recomendacao: { rotulo: 'Recomendação', icone: 'thumbs-up-outline' },
        alerta: { rotulo: 'Alerta', icone: 'warning-outline' }
    };

    const PRIORIDADES = { baixa: 'Baixa', media: 'Média', alta: 'Alta' };
    const DIAS_CURTOS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

    // Visual clínico: a interface não usa emojis (a lista acima fica só como referência).
    const emojiDe = () => '';

    // ---------- Pessoas ----------
    function iniciais(nome) {
        const partes = String(nome || '?').trim().split(/\s+/).filter(Boolean);
        if (!partes.length) return '?';
        const primeira = partes[0][0];
        const ultima = partes.length > 1 ? partes[partes.length - 1][0] : '';
        return (primeira + ultima).toUpperCase();
    }

    function avatar(usuario, tamanho = '') {
        const caixa = el('span', { class: `avatar ${tamanho}`.trim(), 'aria-hidden': 'true' });
        preencherAvatar(caixa, usuario);
        return caixa;
    }

    function preencherAvatar(caixa, usuario) {
        if (!caixa) return;
        if (usuario && usuario.foto) {
            limpar(caixa, el('img', { src: usuario.foto, alt: '' }));
        } else {
            limpar(caixa);
            caixa.textContent = iniciais(usuario && usuario.nome);
        }
    }

    const tituloMedico = (medico) => {
        if (!medico) return '';
        const nome = medico.nome || '';
        return /^(dr|dra)\.?\s/i.test(nome) ? nome : `Dr(a). ${nome}`;
    };

    // ---------- Datas ----------
    const fmtDataHora = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    const fmtData = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const fmtMesAno = new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' });
    const fmtHora = new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit' });

    const datas = {
        dataHora: (ts) => fmtDataHora.format(new Date(ts)).replace('.', ''),
        data: (ts) => fmtData.format(new Date(ts)),
        mesAno: (ano, mes) => {
            const texto = fmtMesAno.format(new Date(ano, mes - 1, 1));
            return texto.charAt(0).toUpperCase() + texto.slice(1);
        },
        desde: (ts) => (ts ? fmtMesAno.format(new Date(ts)) : '—'),

        /** "Hoje, 14:30", "Ontem, 09:10" ou data completa. */
        amigavel(ts) {
            const d = new Date(ts);
            const hoje = new Date();
            const ontem = new Date();
            ontem.setDate(hoje.getDate() - 1);
            if (d.toDateString() === hoje.toDateString()) return `Hoje, ${fmtHora.format(d)}`;
            if (d.toDateString() === ontem.toDateString()) return `Ontem, ${fmtHora.format(d)}`;
            return datas.dataHora(ts);
        },

        /** "há 5 min", "há 3 h", "há 2 dias". */
        relativo(ts) {
            if (!ts) return 'sem registros';
            const minutos = Math.max(0, Math.floor((Date.now() - ts) / 60000));
            if (minutos < 1) return 'agora';
            if (minutos < 60) return `há ${minutos} min`;
            const horas = Math.floor(minutos / 60);
            if (horas < 24) return `há ${horas} h`;
            const dias = Math.floor(horas / 24);
            if (dias < 30) return `há ${dias} dia${dias > 1 ? 's' : ''}`;
            const meses = Math.floor(dias / 30);
            return `há ${meses} ${meses > 1 ? 'meses' : 'mês'}`;
        },

        /** "2026-03-15" → "15/03/2026" */
        isoParaBr(iso) {
            if (!iso) return 'Não informado';
            const [a, m, d] = iso.split('-');
            return `${d}/${m}/${a}`;
        }
    };

    // ---------- Avisos (toast) ----------
    function toast(mensagem, tipo = 'ok') {
        let area = $('.toast-area');
        if (!area) {
            area = el('div', { class: 'toast-area', role: 'status', 'aria-live': 'polite' });
            document.body.append(area);
        }
        const nomes = { ok: 'checkmark-circle', erro: 'alert-circle', aviso: 'notifications' };
        const aviso = el('div', { class: `toast ${tipo}` }, icone(nomes[tipo] || nomes.ok), el('span', { text: mensagem }));
        area.append(aviso);
        setTimeout(() => {
            aviso.classList.add('saindo');
            aviso.addEventListener('animationend', () => aviso.remove(), { once: true });
        }, tipo === 'aviso' ? 8000 : 3500);
    }

    // ---------- Modais ----------
    const pilhaFoco = [];

    const Modal = {
        abrir(id) {
            const modal = typeof id === 'string' ? document.getElementById(id) : id;
            if (!modal) return;
            pilhaFoco.push(document.activeElement);
            modal.classList.add('open');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            const foco = modal.querySelector('[autofocus], input:not([type="hidden"]):not([disabled]), select, textarea, .btn-primary');
            setTimeout(() => foco && foco.focus({ preventScroll: true }), 60);
        },

        fechar(id) {
            const modal = typeof id === 'string' ? document.getElementById(id) : id;
            if (!modal || !modal.classList.contains('open')) return;
            modal.classList.remove('open');
            modal.setAttribute('aria-hidden', 'true');
            if (!$('.modal.open')) document.body.style.overflow = '';
            modal.dispatchEvent(new CustomEvent('fechou'));
            const anterior = pilhaFoco.pop();
            if (anterior && anterior.focus) anterior.focus({ preventScroll: true });
        },

        aberto: () => $$('.modal.open').pop()
    };

    /** Diálogo de confirmação. Retorna Promise<boolean>. */
    function confirmar({ titulo, texto, botao = 'Confirmar', perigo = false }) {
        return new Promise((resolve) => {
            const btnOk = el('button', { class: `btn ${perigo ? 'btn-danger' : 'btn-primary'}`, type: 'button', text: botao });
            const btnCancelar = el('button', { class: 'btn btn-ghost', type: 'button', text: 'Cancelar' });
            const modal = el('div', { class: 'modal', role: 'alertdialog', 'aria-modal': 'true' },
                el('div', { class: 'modal-content' },
                    el('div', { class: 'modal-head' },
                        el('div', { class: 'modal-icon', style: perigo ? 'color: var(--danger); background: rgba(var(--critica), .14)' : '' },
                            icone(perigo ? 'trash-outline' : 'help-circle-outline')),
                        el('div', {}, el('h3', { text: titulo }), texto ? el('p', { text: texto }) : null)
                    ),
                    el('div', { class: 'modal-actions' }, btnCancelar, btnOk)
                )
            );
            let resposta = false;
            const fechar = (valor) => { resposta = valor; Modal.fechar(modal); };
            btnOk.addEventListener('click', () => fechar(true));
            btnCancelar.addEventListener('click', () => fechar(false));
            modal.addEventListener('fechou', () => { modal.remove(); resolve(resposta); });
            document.body.append(modal);
            Modal.abrir(modal);
            setTimeout(() => btnCancelar.focus(), 70);
        });
    }

    // Fechar por botão [data-fechar], clique no fundo ou Esc.
    document.addEventListener('click', (evento) => {
        const opcaoTema = evento.target.closest('[data-tema-opcao]');
        if (opcaoTema) return definirTema(opcaoTema.dataset.temaOpcao);
        if (evento.target.closest('[data-tema-toggle]')) return definirTema(lerTema() === 'dark' ? 'light' : 'dark');

        const fechar = evento.target.closest('[data-fechar]');
        if (fechar) return Modal.fechar(fechar.closest('.modal'));
        if (evento.target.classList.contains('modal')) Modal.fechar(evento.target);
    });

    document.addEventListener('keydown', (evento) => {
        if (evento.key === 'Escape') {
            const modal = Modal.aberto();
            if (modal) Modal.fechar(modal);
        }
    });

    document.addEventListener('DOMContentLoaded', () => aplicarTema(lerTema()));

    // ---------- Formulários ----------
    function ocupado(botao, sim) {
        if (!botao) return;
        botao.disabled = sim;
        botao.setAttribute('aria-busy', String(sim));
    }

    function mascaraTelefone(input) {
        input.addEventListener('input', () => {
            const n = input.value.replace(/\D/g, '').slice(0, 11);
            let v = n;
            if (n.length > 10) v = n.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
            else if (n.length > 6) v = n.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
            else if (n.length > 2) v = n.replace(/(\d{2})(\d{0,5})/, '($1) $2');
            else if (n.length > 0) v = `(${n}`;
            input.value = v;
        });
    }

    function contador(textarea, saida) {
        const atualizar = () => { saida.textContent = `${textarea.value.length}/${textarea.maxLength}`; };
        textarea.addEventListener('input', atualizar);
        atualizar();
        return atualizar;
    }

    async function copiar(texto, mensagem = 'Copiado!') {
        try {
            await navigator.clipboard.writeText(texto);
        } catch {
            const area = el('textarea', { style: 'position:fixed;opacity:0' });
            area.value = texto;
            document.body.append(area);
            area.select();
            document.execCommand('copy');
            area.remove();
        }
        toast(mensagem);
    }

    /** Reduz a foto para 256×256 (JPEG) antes de salvar no banco. */
    function reduzirImagem(arquivo, lado = 256) {
        return new Promise((resolve, reject) => {
            if (!arquivo.type.startsWith('image/')) return reject(new Error('Escolha um arquivo de imagem.'));
            if (arquivo.size > 10 * 1024 * 1024) return reject(new Error('A imagem deve ter no máximo 10 MB.'));
            const leitor = new FileReader();
            leitor.onerror = () => reject(new Error('Não foi possível ler a imagem.'));
            leitor.onload = () => {
                const img = new Image();
                img.onerror = () => reject(new Error('Imagem inválida.'));
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = lado;
                    canvas.height = lado;
                    const ctx = canvas.getContext('2d');
                    const menor = Math.min(img.width, img.height);
                    ctx.drawImage(img, (img.width - menor) / 2, (img.height - menor) / 2, menor, menor, 0, 0, lado, lado);
                    resolve(canvas.toDataURL('image/jpeg', 0.85));
                };
                img.src = leitor.result;
            };
            leitor.readAsDataURL(arquivo);
        });
    }

    /** Estado vazio padrão. */
    function vazio(nomeIcone, titulo, texto) {
        return el('div', { class: 'empty' },
            el('div', { class: 'empty-icon' }, icone(nomeIcone)),
            el('h3', { text: titulo }),
            texto ? el('p', { text: texto }) : null
        );
    }

    function esqueleto(qtd = 3, altura = 64) {
        return Array.from({ length: qtd }, () => el('div', { class: 'skeleton', style: `min-height:${altura}px` }));
    }

    // ---------- Diário agrupado por dia ----------
    const hora = (ts) => fmtHora.format(new Date(ts));

    function cabecalhoDia(d, humor) {
        const hoje = new Date();
        const ontem = new Date();
        ontem.setDate(hoje.getDate() - 1);
        const nome = d.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
        const prefixo = d.toDateString() === hoje.toDateString() ? 'Hoje · ' : d.toDateString() === ontem.toDateString() ? 'Ontem · ' : '';
        return el('div', { class: 'list-group day-group' },
            el('span', { class: 'day-group-name', text: prefixo + nome }),
            humor
                ? el('span', { class: 'day-mood', title: 'Humor registrado no afetivograma' },
                    el('span', { class: `status-dot ${humor.intensidade}`, 'aria-hidden': 'true' }),
                    `${humor.emocao}, ${(INTENSIDADES[humor.intensidade] || '').toLowerCase()}`)
                : el('span', { class: 'day-mood vazio', text: 'Sem registro de humor' })
        );
    }

    /**
     * Agrupa registros do diário por dia. O cabeçalho de cada dia mostra o humor
     * do afetivograma ({AAAA-MM-DD: registro}). `linha(entrada)` monta cada registro.
     */
    function diarioPorDia(entradas, humorPorData, linha) {
        const nos = [];
        let atual = '';
        entradas.forEach((entrada) => {
            const d = new Date(entrada.criadoEm);
            const chave = DB.chaveData(d);
            if (chave !== atual) {
                atual = chave;
                nos.push(cabecalhoDia(d, (humorPorData || {})[chave]));
            }
            nos.push(linha(entrada));
        });
        return nos;
    }

    /**
     * Animação de troca de aba: barra de progresso no topo e o conteúdo
     * entrando com um esmaecer curto. Não muda nada de lugar.
     */
    let timerCarregando = null;
    function animarTroca(painel) {
        let barra = $('.loading-bar');
        if (!barra) {
            barra = el('div', { class: 'loading-bar', 'aria-hidden': 'true' });
            document.body.append(barra);
        }
        barra.classList.remove('ativa', 'fim');
        void barra.offsetWidth; // reinicia a animação
        barra.classList.add('ativa');
        clearTimeout(timerCarregando);
        timerCarregando = setTimeout(() => barra.classList.add('fim'), 420);

        if (painel) {
            painel.classList.remove('entrando');
            void painel.offsetWidth;
            painel.classList.add('entrando');
        }
    }

    /** Liga a navegação lateral às seções [data-section]. */
    function navegacao(aoMudar) {
        const botoes = $$('.nav-btn[data-target]');
        const secoes = $$('[data-section]');
        function mostrar(alvo, { rolar = true } = {}) {
            if (!secoes.some((s) => s.dataset.section === alvo)) alvo = secoes[0].dataset.section;
            botoes.forEach((b) => {
                const ativo = b.dataset.target === alvo;
                b.classList.toggle('active', ativo);
                b.setAttribute('aria-current', ativo ? 'page' : 'false');
            });
            secoes.forEach((s) => { s.hidden = s.dataset.section !== alvo; });
            animarTroca(secoes.find((s) => s.dataset.section === alvo));
            if (history.replaceState) history.replaceState(null, '', `#${alvo}`);
            if (rolar) window.scrollTo({ top: 0, behavior: 'smooth' });
            if (aoMudar) aoMudar(alvo);
        }
        botoes.forEach((b) => b.addEventListener('click', () => mostrar(b.dataset.target)));
        mostrar(location.hash.slice(1) || botoes[0].dataset.target, { rolar: false });
        return mostrar;
    }

    window.UI = {
        $, $$, el, icone, limpar,
        EMOCOES, INTENSIDADES, TIPOS_ANOTACAO, PRIORIDADES, DIAS_CURTOS, emojiDe,
        iniciais, avatar, preencherAvatar, tituloMedico,
        datas, toast, Modal, confirmar,
        ocupado, mascaraTelefone, contador, copiar, reduzirImagem,
        vazio, esqueleto, navegacao, definirTema, diarioPorDia, hora, animarTroca
    };
})();
