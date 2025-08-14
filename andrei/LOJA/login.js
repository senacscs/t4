document.addEventListener('DOMContentLoaded', function() {
    const formLogin = document.getElementById('formLoginPrincipal');
    const mensagemLogin = document.getElementById('mensagemLogin');
    const userInfo = document.getElementById('userInfo');
    const loggedUser = document.getElementById('loggedUser');
    const btnLogout = document.getElementById('btnLogout');
    
    // Verificar se já está logado (simulação com sessionStorage)
    if (sessionStorage.getItem('usuarioLogado')) {
        const usuario = JSON.parse(sessionStorage.getItem('usuarioLogado'));
        mostrarInfoUsuario(usuario);
    }
    
    // Login
    formLogin.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const usuario = document.getElementById('usuarioLogin').value;
        const senha = document.getElementById('senhaLogin').value;
        
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ usuario, senha })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                sessionStorage.setItem('usuarioLogado', JSON.stringify(data.user));
                mostrarInfoUsuario(data.user);
                mensagemLogin.innerHTML = '<p class="success">Login realizado com sucesso!</p>';
                formLogin.reset();
            } else {
                mensagemLogin.innerHTML = '<p class="error">Usuário ou senha incorretos</p>';
            }
        })
        .catch(error => {
            console.error('Erro no login:', error);
            mensagemLogin.innerHTML = '<p class="error">Erro ao fazer login</p>';
        });
    });
    
    // Logout
    btnLogout.addEventListener('click', function() {
        sessionStorage.removeItem('usuarioLogado');
        userInfo.style.display = 'none';
        formLogin.style.display = 'block';
    });
    
    function mostrarInfoUsuario(usuario) {
        loggedUser.textContent = usuario.nome;
        userInfo.style.display = 'block';
        formLogin.style.display = 'none';
    }
});