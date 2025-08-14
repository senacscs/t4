document.getElementById('formUsuario').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const usuario = {
        nome: document.getElementById('nome').value,
        usuario: document.getElementById('usuario').value,
        email: document.getElementById('email').value,
        cpf: document.getElementById('cpf').value,
        senha: document.getElementById('senha').value
    };
    
    fetch('http://localhost:3000/cadastro-usuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('mensagem').innerHTML = 
            `<p class="success">Usuário cadastrado com sucesso! ID: ${data.id}</p>`;
        document.getElementById('formUsuario').reset();
    })
    .catch(error => {
        document.getElementById('mensagem').innerHTML = 
            `<p class="error">Erro ao cadastrar usuário: ${error.message}</p>`;
    });
});