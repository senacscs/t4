document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:3000/produtos')
        .then(response => response.json())
        .then(produtos => {
            const tabela = document.querySelector('#tabelaProdutos tbody');
            produtos.forEach(produto => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${produto.id}</td>
                    <td>${produto.nome}</td>
                    <td>${produto.descricao}</td>
                    <td>R$ ${produto.preco.toFixed(2)}</td>
                    <td>${produto.categoria_id || 'N/A'}</td>
                `;
                tabela.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar produtos:', error);
        });
});