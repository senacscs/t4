document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:3000/usuarios')
        .then(response => response.json())
        .then(usuarios => {
            const tabela = document.querySelector('#tabelaUsuarios tbody');
            usuarios.forEach(usuario => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${usuario.id}</td>
                    <td>${usuario.nome}</td>
                    <td>${usuario.usuario}</td>
                    <td>${usuario.email}</td>
                    <td>${usuario.cpf}</td>
                    <td>${new Date(usuario.data_cadastro).toLocaleString()}</td>
                `;
                tabela.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar usuários:', error);
        });
});