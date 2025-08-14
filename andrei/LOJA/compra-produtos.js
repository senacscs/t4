document.addEventListener('DOMContentLoaded', function() {
    let usuarioLogado = null;
    let carrinho = [];
    
    // Elementos da página
    const loginSection = document.getElementById('loginSection');
    const produtosSection = document.getElementById('produtosSection');
    const usuarioInfo = document.getElementById('usuarioInfo');
    const nomeUsuarioSpan = document.getElementById('nomeUsuario');
    const listaProdutos = document.getElementById('listaProdutos');
    const tabelaCarrinho = document.querySelector('#tabelaCarrinho tbody');
    const totalCarrinho = document.getElementById('totalCarrinho');
    const finalizarCompraBtn = document.getElementById('finalizarCompra');
    
    // Login
    document.getElementById('formLogin').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const usuario = document.getElementById('loginUsuario').value;
        const senha = document.getElementById('loginSenha').value;
        
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
                usuarioLogado = data.user;
                nomeUsuarioSpan.textContent = usuarioLogado.nome;
                loginSection.style.display = 'none';
                produtosSection.style.display = 'block';
                usuarioInfo.style.display = 'block';
                carregarProdutos();
            } else {
                alert('Usuário ou senha incorretos');
            }
        })
        .catch(error => {
            console.error('Erro no login:', error);
            alert('Erro ao fazer login');
        });
    });
    
    // Logout
    document.getElementById('logout').addEventListener('click', function() {
        usuarioLogado = null;
        carrinho = [];
        loginSection.style.display = 'block';
        produtosSection.style.display = 'none';
        usuarioInfo.style.display = 'none';
        document.getElementById('formLogin').reset();
        atualizarCarrinho();
    });
    
    // Carregar produtos
    function carregarProdutos() {
        fetch('http://localhost:3000/produtos')
            .then(response => response.json())
            .then(produtos => {
                listaProdutos.innerHTML = '';
                produtos.forEach(produto => {
                    const produtoDiv = document.createElement('div');
                    produtoDiv.className = 'produto';
                    produtoDiv.innerHTML = `
                        <h3>${produto.nome}</h3>
                        <p>${produto.descricao}</p>
                        <p class="preco">R$ ${produto.preco.toFixed(2)}</p>
                        <div class="acoes">
                            <input type="number" id="qtd-${produto.id}" min="1" value="1">
                            <button class="add-carrinho" data-id="${produto.id}">Adicionar</button>
                        </div>
                    `;
                    listaProdutos.appendChild(produtoDiv);
                });
                
                // Adicionar eventos aos botões
                document.querySelectorAll('.add-carrinho').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const produtoId = parseInt(this.getAttribute('data-id'));
                        const quantidade = parseInt(document.getElementById(`qtd-${produtoId}`).value);
                        
                        fetch(`http://localhost:3000/produtos/${produtoId}`)
                            .then(response => response.json())
                            .then(produto => {
                                adicionarAoCarrinho(produto, quantidade);
                            })
                            .catch(error => {
                                console.error('Erro ao buscar produto:', error);
                            });
                    });
                });
            })
            .catch(error => {
                console.error('Erro ao carregar produtos:', error);
            });
    }
    
    // Funções do carrinho
    function adicionarAoCarrinho(produto, quantidade) {
        const itemExistente = carrinho.find(item => item.produto_id === produto.id);
        
        if (itemExistente) {
            itemExistente.quantidade += quantidade;
            itemExistente.subtotal = itemExistente.quantidade * itemExistente.preco_unitario;
        } else {
            carrinho.push({
                produto_id: produto.id,
                nome: produto.nome,
                quantidade: quantidade,
                preco_unitario: produto.preco,
                subtotal: quantidade * produto.preco
            });
        }
        
        atualizarCarrinho();
    }
    
    function atualizarCarrinho() {
        tabelaCarrinho.innerHTML = '';
        let total = 0;
        
        carrinho.forEach((item, index) => {
            total += item.subtotal;
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.nome}</td>
                <td>${item.quantidade}</td>
                <td>R$ ${item.preco_unitario.toFixed(2)}</td>
                <td>R$ ${item.subtotal.toFixed(2)}</td>
                <td><button class="remover-item" data-index="${index}">Remover</button></td>
            `;
            tabelaCarrinho.appendChild(row);
        });
        
        totalCarrinho.textContent = `R$ ${total.toFixed(2)}`;
        finalizarCompraBtn.disabled = carrinho.length === 0;
        
        // Adicionar eventos aos botões de remover
        document.querySelectorAll('.remover-item').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                carrinho.splice(index, 1);
                atualizarCarrinho();
            });
        });
    }
    
    // Finalizar compra
    finalizarCompraBtn.addEventListener('click', function() {
        if (!usuarioLogado || carrinho.length === 0) return;
        
        const total = carrinho.reduce((sum, item) => sum + item.subtotal, 0);
        const itens = carrinho.map(item => ({
            produto_id: item.produto_id,
            quantidade: item.quantidade,
            preco_unitario: item.preco_unitario,
            subtotal: item.subtotal
        }));
        
        fetch('http://localhost:3000/pedidos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                usuario_id: usuarioLogado.id,
                total: total,
                itens: itens
            })
        })
        .then(response => response.json())
        .then(data => {
            alert(`Pedido #${data.id} realizado com sucesso!`);
            carrinho = [];
            atualizarCarrinho();
        })
        .catch(error => {
            console.error('Erro ao finalizar pedido:', error);
            alert('Erro ao finalizar pedido');
        });
    });
});