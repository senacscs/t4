document.addEventListener('DOMContentLoaded', function() {
    let usuarioLogado = null;
    
    // Elementos da página
    const loginSection = document.getElementById('loginSection');
    const pedidosSection = document.getElementById('pedidosSection');
    const nomeUsuarioPedidos = document.getElementById('nomeUsuarioPedidos');
    const listaPedidos = document.getElementById('listaPedidos');
    
    // Login
    document.getElementById('formLoginPedidos').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const usuario = document.getElementById('loginUsuarioPedidos').value;
        const senha = document.getElementById('loginSenhaPedidos').value;
        
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
                nomeUsuarioPedidos.textContent = usuarioLogado.nome;
                loginSection.style.display = 'none';
                pedidosSection.style.display = 'block';
                carregarPedidos();
            } else {
                alert('Usuário ou senha incorretos');
            }
        })
        .catch(error => {
            console.error('Erro no login:', error);
            alert('Erro ao fazer login');
        });
    });
    
    // Carregar pedidos
    function carregarPedidos() {
        fetch(`http://localhost:3000/pedidos/${usuarioLogado.id}`)
            .then(response => response.json())
            .then(pedidos => {
                if (pedidos.length === 0) {
                    listaPedidos.innerHTML = '<p>Nenhum pedido encontrado.</p>';
                    return;
                }
                
                listaPedidos.innerHTML = '';
                pedidos.forEach(pedido => {
                    const pedidoDiv = document.createElement('div');
                    pedidoDiv.className = 'pedido';
                    pedidoDiv.innerHTML = `
                        <h3>Pedido #${pedido.id} - ${new Date(pedido.data_pedido).toLocaleString()}</h3>
                        <p>Status: ${pedido.status}</p>
                        <p>Total: R$ ${pedido.total.toFixed(2)}</p>
                        <h4>Itens:</h4>
                        <ul class="itens-pedido">
                            ${pedido.itens.map(item => `
                                <li>
                                    ${item.quantidade}x ${item.produto_nome} - 
                                    R$ ${item.preco_unitario.toFixed(2)} cada = 
                                    R$ ${item.subtotal.toFixed(2)}
                                </li>
                            `).join('')}
                        </ul>
                        <hr>
                    `;
                    listaPedidos.appendChild(pedidoDiv);
                });
            })
            .catch(error => {
                console.error('Erro ao carregar pedidos:', error);
                listaPedidos.innerHTML = '<p class="error">Erro ao carregar pedidos.</p>';
            });
    }
});