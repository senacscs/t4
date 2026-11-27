/* =========================================================
   MoodAlert · Componente do afetivograma
   Calendário mensal com navegação, legenda e resumo do mês.
   Usado pelo paciente (editável) e pelo médico (leitura).
   ========================================================= */
(function () {
    'use strict';

    const { el, icone, limpar, INTENSIDADES, emojiDe, datas } = UI;
    const ORDEM = ['leve', 'neutro', 'elevada', 'critica'];

    function criar({ raiz, pacienteId, editavel = false, aoClicarDia, aoResumir, resumoRaiz }) {
        const hoje = new Date();
        let ano = hoje.getFullYear();
        let mes = hoje.getMonth() + 1;
        let registros = {};

        const titulo = el('h2', { 'aria-live': 'polite' });
        const btnAnterior = el('button', { class: 'icon-btn', type: 'button', title: 'Mês anterior', 'aria-label': 'Mês anterior' }, icone('chevron-back'));
        const btnProximo = el('button', { class: 'icon-btn', type: 'button', title: 'Próximo mês', 'aria-label': 'Próximo mês' }, icone('chevron-forward'));
        const btnHoje = el('button', { class: 'btn btn-ghost btn-sm', type: 'button', text: 'Hoje' });
        const grade = el('div', { class: 'cal-grid', role: 'grid', 'aria-label': 'Calendário de emoções do mês' });
        // Resumo: numa lista lateral (resumoRaiz) ou numa linha embaixo do calendário.
        const resumo = resumoRaiz || el('div', { class: 'cal-summary' });

        const legenda = el('div', { class: 'legend', 'aria-label': 'Intensidades' },
            ORDEM.map((i) => el('span', { class: `legend-item ${i}`, text: INTENSIDADES[i] }))
        );

        let ultimos = {}; // {AAAA-MM-DD: registro} dos últimos 30 dias (só para a sequência)

        limpar(raiz,
            el('div', { class: 'cal-toolbar' },
                el('div', { class: 'cal-nav' }, btnAnterior, titulo, btnProximo, btnHoje),
                legenda
            ),
            grade,
            resumoRaiz ? null : resumo
        );

        btnAnterior.addEventListener('click', () => mudarMes(-1));
        btnProximo.addEventListener('click', () => mudarMes(1));
        btnHoje.addEventListener('click', () => irPara(hoje.getFullYear(), hoje.getMonth() + 1));

        function mudarMes(delta) {
            const d = new Date(ano, mes - 1 + delta, 1);
            irPara(d.getFullYear(), d.getMonth() + 1);
        }

        function ehMesAtual() {
            return ano === hoje.getFullYear() && mes === hoje.getMonth() + 1;
        }

        async function irPara(novoAno, novoMes) {
            ano = novoAno;
            mes = novoMes;
            titulo.textContent = datas.mesAno(ano, mes);
            btnProximo.disabled = ehMesAtual() || new Date(ano, mes - 1, 1) > hoje;
            btnHoje.hidden = ehMesAtual();
            grade.setAttribute('aria-busy', 'true');
            desenhar(); // desenha vazio enquanto carrega
            try {
                registros = await DB.Afetivograma.mes(pacienteId, ano, mes);
            } catch (erro) {
                console.error(erro);
                registros = {};
                UI.toast('Não foi possível carregar o afetivograma.', 'erro');
            }
            grade.removeAttribute('aria-busy');
            desenhar();
        }

        function desenhar() {
            const primeiroDia = new Date(ano, mes - 1, 1).getDay();
            const totalDias = new Date(ano, mes, 0).getDate();
            const celulas = UI.DIAS_CURTOS.map((d) => el('span', { class: 'weekday', role: 'columnheader', text: d }));

            for (let i = 0; i < primeiroDia; i++) celulas.push(el('span', { class: 'day empty', 'aria-hidden': 'true' }));

            for (let dia = 1; dia <= totalDias; dia++) {
                const data = new Date(ano, mes - 1, dia);
                const registro = registros[dia];
                const futuro = data > hoje && data.toDateString() !== hoje.toDateString();
                const ehHoje = data.toDateString() === hoje.toDateString();

                const classes = ['day'];
                if (registro) classes.push(registro.intensidade);
                if (ehHoje) classes.push('hoje');
                if (futuro) classes.push('locked');

                const rotulo = registro
                    ? `Dia ${dia}: ${registro.emocao}, intensidade ${INTENSIDADES[registro.intensidade] || registro.intensidade}${registro.observacoes ? ` — ${registro.observacoes}` : ''}`
                    : `Dia ${dia}${futuro ? ' (ainda não pode ser preenchido)' : ': sem registro'}`;

                const conteudo = [
                    el('span', { class: 'day-number', text: dia }),
                    registro ? el('span', { class: 'day-label', text: registro.emocao, 'aria-hidden': 'true' }) : null
                ];

                const clicavel = editavel && !futuro;
                if (clicavel && !registro) {
                    classes.push('can-add');
                    conteudo.push(el('span', { class: 'day-add', 'aria-hidden': 'true' }, icone('add'), 'Registrar'));
                }
                const celula = clicavel
                    ? el('button', { class: classes.join(' '), type: 'button', title: rotulo, 'aria-label': rotulo, role: 'gridcell' }, conteudo)
                    : el('div', { class: classes.join(' '), title: rotulo, 'aria-label': rotulo, role: 'gridcell', tabindex: registro ? '0' : null }, conteudo);

                if (clicavel) {
                    celula.addEventListener('click', () => aoClicarDia && aoClicarDia(data, registro || null));
                } else if (futuro && editavel) {
                    celula.setAttribute('aria-disabled', 'true');
                }
                celulas.push(celula);
            }

            // Completa a última semana para a grade não ficar com buraco.
            const usados = primeiroDia + totalDias;
            for (let i = usados; i % 7 !== 0; i++) celulas.push(el('span', { class: 'day empty', 'aria-hidden': 'true' }));

            limpar(grade, celulas);
            desenharResumo(totalDias);
        }

        /** Uma linha curta embaixo do calendário. */
        function desenharResumo(totalDias) {
            const lista = Object.values(registros);
            const diasPossiveis = ehMesAtual() ? hoje.getDate() : totalDias;
            const emocoes = {};
            let criticos = 0;
            lista.forEach((r) => {
                emocoes[r.emocao] = (emocoes[r.emocao] || 0) + 1;
                if (r.intensidade === 'critica') criticos++;
            });
            const topo = Object.entries(emocoes).sort((a, b) => b[1] - a[1])[0];
            const elevados = lista.filter((r) => r.intensidade === 'elevada').length;

            if (resumoRaiz) {
                const linha = (rotulo, valor, cor) => [
                    el('dt', {}, cor ? el('span', { class: `status-dot ${cor}`, 'aria-hidden': 'true' }) : null, rotulo),
                    el('dd', { text: valor })
                ];
                const conta = (i) => String(lista.filter((r) => r.intensidade === i).length);
                return limpar(resumo,
                    linha('Dias registrados', `${lista.length} de ${diasPossiveis}`),
                    linha('Emoção mais frequente', topo ? topo[0] : '—'),
                    el('div', { class: 'summary-sep', 'aria-hidden': 'true' }),
                    ORDEM.flatMap((i) => linha(`Intensidade ${INTENSIDADES[i].toLowerCase()}`, conta(i), i))
                );
            }

            if (!lista.length) {
                return limpar(resumo, el('span', { text: 'Nenhum dia registrado neste mês.' }));
            }
            limpar(resumo,
                el('span', {}, el('b', { text: lista.length }), ` de ${diasPossiveis} dias registrados`),
                el('span', {}, 'Mais frequente: ', el('b', { text: topo[0] })),
                el('span', {}, el('b', { text: criticos }), criticos === 1 ? ' dia crítico' : ' dias críticos')
            );
        }

        // ---------- Sequência de dias registrados (para o cartão "Hoje") ----------
        async function carregarUltimos() {
            try {
                ultimos = await DB.Afetivograma.ultimosDias(pacienteId, 60);
            } catch (erro) {
                console.error(erro);
                ultimos = {};
            }
            resumirHoje();
        }

        function resumirHoje() {
            if (!aoResumir) return;
            // Dias seguidos com registro até hoje (hoje ainda vazio não quebra a sequência).
            let sequencia = 0;
            for (let i = 0; i < 60; i++) {
                const d = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() - i);
                if (ultimos[DB.chaveData(d)]) sequencia++;
                else if (i === 0) continue;
                else break;
            }
            aoResumir({ hoje: ultimos[DB.chaveData(hoje)] || null, sequencia });
        }

        /** Atualiza um dia sem recarregar o mês todo. */
        function definirDia(data, registro) {
            const chave = DB.chaveData(data);
            if (registro) ultimos[chave] = registro;
            else delete ultimos[chave];
            resumirHoje();
            if (data.getFullYear() !== ano || data.getMonth() + 1 !== mes) return;
            if (registro) registros[data.getDate()] = registro;
            else delete registros[data.getDate()];
            desenhar();
        }

        irPara(ano, mes);
        carregarUltimos();

        return { irPara, definirDia, recarregar: () => { irPara(ano, mes); carregarUltimos(); } };
    }

    /**
     * Avalia os registros dos últimos dias para o painel do médico.
     * Retorna { classe, texto, ultimo, nivel } — nivel maior = mais urgente.
     */
    function avaliar(registrosPorData) {
        const chaves = Object.keys(registrosPorData || {}).sort();
        const registros = chaves.map((k) => ({ data: k, ...registrosPorData[k] }));
        const ultimo = registros[registros.length - 1] || null;
        const criticos = registros.filter((r) => r.intensidade === 'critica').length;
        const elevados = registros.filter((r) => r.intensidade === 'elevada').length;

        if (!registros.length) return { classe: 'neutro', texto: 'Sem registros', ultimo, nivel: 1, criticos, elevados };
        if (criticos >= 2 || (ultimo && ultimo.intensidade === 'critica')) {
            return { classe: 'critico', texto: 'Crítico', ultimo, nivel: 3, criticos, elevados };
        }
        if (criticos + elevados >= 3 || (ultimo && ultimo.intensidade === 'elevada')) {
            return { classe: 'atencao', texto: 'Atenção', ultimo, nivel: 2, criticos, elevados };
        }
        return { classe: '', texto: 'Estável', ultimo, nivel: 0, criticos, elevados };
    }

    window.Afetivograma = { criar, avaliar };
})();
