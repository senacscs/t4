// Elementos
const btnEntrar = document.getElementById('btnEntrar');
const btnCadastrar = document.getElementById('btnCadastrar');
const formEntrar = document.getElementById('formEntrar');
const formCadastrar = document.getElementById('formCadastrar');

function toggleView(target) {
    if (!btnEntrar || !btnCadastrar || !formEntrar || !formCadastrar) return;

    const isLogin = target === 'login';
    btnEntrar.classList.toggle('active', isLogin);
    btnCadastrar.classList.toggle('active', !isLogin);
    btnEntrar.setAttribute('aria-selected', String(isLogin));
    btnCadastrar.setAttribute('aria-selected', String(!isLogin));
    formEntrar.classList.toggle('hidden', !isLogin);
    formCadastrar.classList.toggle('hidden', isLogin);
}

btnEntrar?.addEventListener('click', () => toggleView('login'));
btnCadastrar?.addEventListener('click', () => toggleView('cadastro'));

// inicializa estado correto
toggleView('login');

// Processar Login
const loginForm = formEntrar?.querySelector('form');
loginForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    const senha = e.target.querySelector('input[type="password"]').value;

    console.log('Login:', { email });
    
    // Fazer login usando o sistema de autenticação
    const resultado = await Auth.login(email, senha);
    
    if (!resultado.success) {
        alert(resultado.error);
        return;
    }
    
    // Redirecionar baseado no tipo de usuário
    if (resultado.usuario.tipo === 'medico') {
        window.location.href = 'paginas/medico.html';
    } else {
        window.location.href = 'paginas/paciente.html';
    }
});

// Processar Cadastro
const cadastroForm = formCadastrar?.querySelector('form');
let cadastrando = false; // Flag para evitar múltiplos cliques

cadastroForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Prevenir múltiplos cliques
    if (cadastrando) {
        return;
    }
    
    const nome = e.target.querySelector('input[name="nome"]').value.trim();
    const email = e.target.querySelector('input[name="email"]').value.trim().toLowerCase();
    const senha = e.target.querySelector('input[name="senha"]').value;
    const confirmarSenha = e.target.querySelector('input[name="confirmarSenha"]').value;
    const tipoElem = e.target.querySelector('input[name="tipoCadastro"]:checked');
    const tipo = tipoElem ? tipoElem.value : 'paciente';
    const btnSubmit = e.target.querySelector('button[type="submit"]');
    
    // Validações
    if (!nome || !email || !senha) {
        alert('Por favor, preencha todos os campos!');
        return;
    }
    
    if (senha.length < 6) {
        alert('A senha deve ter no mínimo 6 caracteres!');
        return;
    }
    
    if (senha !== confirmarSenha) {
        alert('As senhas não coincidem!');
        return;
    }
    
    // Desabilitar botão e marcar como processando
    cadastrando = true;
    if (btnSubmit) {
        btnSubmit.disabled = true;
        btnSubmit.textContent = 'Cadastrando...';
    }
    
    // Registrar usuário
    const resultado = await Auth.register({ nome, email, senha, tipo });
    
    if (!resultado.success) {
        alert(resultado.error);
        // Reabilitar botão
        cadastrando = false;
        if (btnSubmit) {
            btnSubmit.disabled = false;
            btnSubmit.textContent = 'Criar conta';
        }
        return;
    }
    
    alert(`Cadastro realizado com sucesso!\nBem-vindo(a), ${nome}!`);
    console.log('Usuário cadastrado:', resultado.userId);
    
    // Limpar formulário
    e.target.reset();
    
    // Alternar para aba de login
    toggleView('login');
    
    // Reabilitar botão após 2 segundos
    setTimeout(() => {
        cadastrando = false;
        if (btnSubmit) {
            btnSubmit.disabled = false;
            btnSubmit.textContent = 'Criar conta';
        }
    }, 2000);
});
