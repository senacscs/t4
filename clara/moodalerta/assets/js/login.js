/* =========================================================
   MoodAlert · Tela de login e cadastro
   ========================================================= */
(function () {
    'use strict';

    const { $, $$, ocupado } = UI;

    // Já logado? Vai direto para a área certa.
    const sessaoAtual = Auth.sessao();
    if (sessaoAtual) {
        window.location.replace(Auth.destino(sessaoAtual.tipo));
        return;
    }

    // ---------- Prévia ilustrativa do afetivograma ----------
    // Sempre o mês atual, com registros de exemplo até hoje (só ilustração).
    (function desenharPrevia() {
        const grade = $('#previewGrid');
        if (!grade) return;
        const hoje = new Date();
        const ano = hoje.getFullYear();
        const mes = hoje.getMonth();
        const totalDias = new Date(ano, mes + 1, 0).getDate();
        const inicio = new Date(ano, mes, 1).getDay();
        // Padrão fixo de exemplo: maioria leve/neutro, uma fase elevada e um dia crítico.
        const padrao = 'llnlnllnelnll-lnlllne-eeclnlln-';
        const classes = { l: 'leve', n: 'neutro', e: 'elevada', c: 'critica' };
        const itens = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((d) => {
            const s = document.createElement('span');
            s.className = 'sem';
            s.textContent = d;
            return s;
        });
        for (let i = 0; i < inicio; i++) {
            const v = document.createElement('i');
            v.className = 'vazio';
            itens.push(v);
        }
        let registrados = 0;
        for (let dia = 1; dia <= totalDias; dia++) {
            const c = document.createElement('i');
            const classe = dia <= hoje.getDate() ? classes[padrao[dia - 1]] : null;
            if (classe) { c.classList.add(classe); registrados++; }
            if (dia > hoje.getDate()) c.classList.add('futuro');
            if (dia === hoje.getDate()) c.classList.add('hoje');
            c.textContent = dia;
            c.style.animationDelay = `${0.15 + dia * 0.012}s`;
            itens.push(c);
        }
        grade.replaceChildren(...itens);
        $('#previewMes').textContent = UI.datas.mesAno(ano, mes + 1);
        $('#previewBadge').textContent = `${registrados} dia${registrados === 1 ? '' : 's'} registrado${registrados === 1 ? '' : 's'}`;
    })();

    const abaEntrar = $('#abaEntrar');
    const abaCadastrar = $('#abaCadastrar');
    const formEntrar = $('#formEntrar');
    const formCadastrar = $('#formCadastrar');
    const titulo = $('#tituloCartao');
    const subtitulo = $('#subtituloCartao');

    // ---------- Abas ----------
    function mostrar(qual) {
        const entrar = qual === 'entrar';
        abaEntrar.classList.toggle('active', entrar);
        abaCadastrar.classList.toggle('active', !entrar);
        abaEntrar.setAttribute('aria-selected', String(entrar));
        abaCadastrar.setAttribute('aria-selected', String(!entrar));
        abaEntrar.tabIndex = entrar ? 0 : -1;
        abaCadastrar.tabIndex = entrar ? -1 : 0;
        // As duas abas ocupam o mesmo espaço: a inativa só fica invisível.
        formEntrar.classList.toggle('inativo', !entrar);
        formCadastrar.classList.toggle('inativo', entrar);
        formEntrar.inert = !entrar;
        formCadastrar.inert = entrar;
        titulo.textContent = entrar ? 'Entre na plataforma' : 'Crie sua conta';
        subtitulo.textContent = entrar ? 'Que bom ter você de volta.' : 'Leva menos de um minuto.';
        $('.tab-switch').dataset.aba = entrar ? 'entrar' : 'cadastrar';
        esconderAlerta(entrar ? formEntrar : formCadastrar);
    }

    if (location.hash === '#cadastrar') mostrar('cadastrar');

    abaEntrar.addEventListener('click', () => mostrar('entrar'));
    abaCadastrar.addEventListener('click', () => mostrar('cadastrar'));
    $$('[data-ir]').forEach((link) => link.addEventListener('click', () => {
        mostrar(link.dataset.ir);
        (link.dataset.ir === 'entrar' ? formEntrar.email : formCadastrar.nome).focus();
    }));

    // Setas do teclado entre as abas
    $('.tab-switch').addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            const indo = abaEntrar.classList.contains('active') ? abaCadastrar : abaEntrar;
            indo.click();
            indo.focus();
        }
    });

    // ---------- Ajudantes ----------
    function mostrarAlerta(form, mensagem, ok = false) {
        const alerta = $('[data-alerta]', form);
        alerta.classList.toggle('ok', ok);
        $('ion-icon', alerta).setAttribute('name', ok ? 'checkmark-circle' : 'alert-circle');
        $('span', alerta).textContent = mensagem;
        alerta.hidden = false;
        alerta.setAttribute('role', 'alert');
    }

    function esconderAlerta(form) {
        $('[data-alerta]', form).hidden = true;
        $$('.field.invalid', form).forEach((f) => f.classList.remove('invalid'));
    }

    function marcarInvalido(input) {
        input.closest('.field').classList.add('invalid');
        input.focus();
    }

    // Mostrar/ocultar senha
    $$('.password-toggle').forEach((botao) => {
        botao.addEventListener('click', () => {
            const input = botao.parentElement.querySelector('input');
            const mostrando = input.type === 'text';
            input.type = mostrando ? 'password' : 'text';
            botao.querySelector('ion-icon').setAttribute('name', mostrando ? 'eye-outline' : 'eye-off-outline');
            botao.setAttribute('aria-label', mostrando ? 'Mostrar senha' : 'Ocultar senha');
        });
    });

    // Campo de CRM só para médico
    $$('input[name="tipo"]', formCadastrar).forEach((radio) => {
        radio.addEventListener('change', () => {
            const medico = formCadastrar.tipo.value === 'medico';
            $('.slot-extra', formCadastrar).dataset.tipo = medico ? 'medico' : 'paciente';
            formCadastrar.crm.tabIndex = medico ? 0 : -1;
            formCadastrar.nascimento.tabIndex = medico ? -1 : 0;
        });
    });

    // Campo de data: abre o calendário ao clicar em qualquer parte
    formCadastrar.nascimento.addEventListener('click', () => {
        try { formCadastrar.nascimento.showPicker(); } catch { /* navegador sem suporte */ }
    });

    // Força da senha
    formCadastrar.senha.addEventListener('input', () => {
        $('.strength', formCadastrar).dataset.nivel = Seguranca.forcaSenha(formCadastrar.senha.value);
    });

    $$('input', formEntrar).concat($$('input', formCadastrar)).forEach((input) => {
        input.addEventListener('input', () => input.closest('.field') && input.closest('.field').classList.remove('invalid'));
    });

    $('#esqueciSenha').addEventListener('click', () => UI.Modal.abrir('modalSenha'));

    // ---------- Entrar ----------
    formEntrar.addEventListener('submit', async (e) => {
        e.preventDefault();
        esconderAlerta(formEntrar);
        const email = formEntrar.email.value.trim();
        const senha = formEntrar.senha.value;

        if (!Auth.emailValido(email.toLowerCase())) {
            marcarInvalido(formEntrar.email);
            return mostrarAlerta(formEntrar, 'Digite um e-mail válido.');
        }
        if (!senha) {
            marcarInvalido(formEntrar.senha);
            return mostrarAlerta(formEntrar, 'Digite sua senha.');
        }

        const botao = $('button[type="submit"]', formEntrar);
        ocupado(botao, true);
        try {
            const sessao = await Auth.entrar(email, senha);
            window.location.replace(Auth.destino(sessao.tipo));
        } catch (erro) {
            console.error(erro);
            mostrarAlerta(formEntrar, mensagemDeErro(erro));
            formEntrar.senha.select();
            ocupado(botao, false);
        }
    });

    // ---------- Cadastrar ----------
    formCadastrar.addEventListener('submit', async (e) => {
        e.preventDefault();
        esconderAlerta(formCadastrar);
        const f = formCadastrar;
        const dados = {
            nome: f.nome.value.trim(),
            email: f.email.value.trim(),
            senha: f.senha.value,
            tipo: f.tipo.value,
            crm: f.tipo.value === 'medico' ? f.crm.value.trim() : '',
            nascimento: f.tipo.value === 'paciente' ? f.nascimento.value : ''
        };

        if (dados.nome.length < 3) { marcarInvalido(f.nome); return mostrarAlerta(f, 'Informe seu nome completo.'); }
        if (!Auth.emailValido(dados.email.toLowerCase())) { marcarInvalido(f.email); return mostrarAlerta(f, 'Digite um e-mail válido.'); }
        if (dados.senha.length < 8) { marcarInvalido(f.senha); return mostrarAlerta(f, 'A senha precisa ter pelo menos 8 caracteres.'); }
        if (dados.senha !== f.confirmar.value) { marcarInvalido(f.confirmar); return mostrarAlerta(f, 'As senhas não coincidem.'); }

        const botao = $('button[type="submit"]', f);
        ocupado(botao, true);
        try {
            await Auth.cadastrar(dados);
            // Entra automaticamente depois de criar a conta.
            const sessao = await Auth.entrar(dados.email, dados.senha);
            UI.toast(`Bem-vindo(a), ${dados.nome.split(' ')[0]}!`);
            setTimeout(() => window.location.replace(Auth.destino(sessao.tipo)), 600);
        } catch (erro) {
            console.error(erro);
            mostrarAlerta(f, mensagemDeErro(erro));
            ocupado(botao, false);
        }
    });

    function mensagemDeErro(erro) {
        const msg = String((erro && erro.message) || '');
        if (/network|offline|Failed to fetch|Client is offline/i.test(msg)) {
            return 'Sem conexão com o servidor. Verifique sua internet e tente de novo.';
        }
        if (/permission_denied/i.test(msg)) return 'O banco recusou a operação. Fale com o responsável pela plataforma.';
        return msg || 'Algo deu errado. Tente de novo.';
    }
})();
