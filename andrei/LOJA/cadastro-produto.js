document.addEventListener('DOMContentLoaded', function() {
    // Carrega categorias no select
    fetch('http://localhost:3000/categorias')
        .then(response => response.json())
        .then(categorias => {
            const select = document.getElementById('categoria_id');
            categorias.forEach(categoria => {
                const option = document.createElement('option');
                option.value = categoria.id;
                option.textContent = categoria.nome;
                select.appendChild(option);
            });
        })
        .catch(error => console.error('Erro ao carregar categorias:', error));

    // Submissão do formulário
    document.getElementById('formProduto').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const produto = {
            nome: document.getElementById('nome').value,
            descricao: document.getElementById('descricao').value,
            preco: parseFloat(document.getElementById('preco').value),
            categoria_id: document.getElementById('categoria_id').value || null,
            estoque: parseInt(document.getElementById('estoque').value) || 0
        };
        
        fetch('http://localhost:3000/produtos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(produto)
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('mensagem').innerHTML = 
                `<p class="success">Produto cadastrado com sucesso! ID: ${data.id}</p>`;
            document.getElementById('formProduto').reset();
        })
        .catch(error => {
            document.getElementById('mensagem').innerHTML = 
                `<p class="error">Erro ao cadastrar produto: ${error.message}</p>`;
        });
    });
});