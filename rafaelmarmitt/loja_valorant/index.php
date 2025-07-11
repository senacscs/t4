<?php
require 'config.php';

function getProducts($pdo) {
    $stmt = $pdo->query('SELECT * FROM products');
    return $stmt->fetchAll();
}

function getUsers($pdo) {
    $stmt = $pdo->query('SELECT * FROM users');
    return $stmt->fetchAll();
}

function getOrders($pdo) {
    $stmt = $pdo->query('SELECT o.id, u.name as user_name, o.order_date, o.status 
                         FROM orders o 
                         JOIN users u ON o.user_id = u.id');
    return $stmt->fetchAll();
}

// Buscar dados
$products = getProducts($pdo);
$users = getUsers($pdo);
$orders = getOrders($pdo);
?>

<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Loja de Contas Valorant</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <header>
        <h1>LOJA DE CONTAS VALORANT</h1>
    </header>

    <div class="container">
        <div class="tabs">
            <div class="tab active" onclick="openTab('products')">Contas</div>
            <div class="tab" onclick="openTab('users')">Usuários</div>
            <div class="tab" onclick="openTab('orders')">Pedidos</div>
            <div class="tab" onclick="openTab('add')">Adicionar</div>
        </div>

        <div id="products" class="tab-content active">
            <h2>Contas Disponíveis</h2>
            <div class="card">
                <table id="productsTable">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Rank</th>
                            <th>Skins</th>
                            <th>Preço</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($products as $product): ?>
                        <tr>
                            <td><?= htmlspecialchars($product['id']) ?></td>
                            <td><?= htmlspecialchars($product['name']) ?></td>
                            <td><?= htmlspecialchars($product['rank']) ?></td>
                            <td><?= htmlspecialchars($product['skin_count']) ?></td>
                            <td class="price">R$ <?= number_format($product['price'], 2, ',', '.') ?></td>
                            <td>
                                <button class="action-btn" onclick="editProduct(<?= $product['id'] ?>)">Editar</button>
                                <button class="action-btn" onclick="deleteProduct(<?= $product['id'] ?>)">Excluir</button>
                            </td>
                        </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        </div>

        <div id="users" class="tab-content">
            <h2>Usuários Cadastrados</h2>
            <div class="card">
                <table id="usersTable">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Telefone</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($users as $user): ?>
                        <tr>
                            <td><?= htmlspecialchars($user['id']) ?></td>
                            <td><?= htmlspecialchars($user['name']) ?></td>
                            <td><?= htmlspecialchars($user['email']) ?></td>
                            <td><?= htmlspecialchars($user['phone']) ?></td>
                        </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        </div>

        <div id="orders" class="tab-content">
            <h2>Pedidos Realizados</h2>
            <div class="card">
                <table id="ordersTable">
                    <thead>
                        <tr>
                            <th>ID Pedido</th>
                            <th>Usuário</th>
                            <th>Data</th>
                            <th>Status</th>
                            <th>Detalhes</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($orders as $order): ?>
                        <tr>
                            <td><?= htmlspecialchars($order['id']) ?></td>
                            <td><?= htmlspecialchars($order['user_name']) ?></td>
                            <td><?= date('d/m/Y', strtotime($order['order_date'])) ?></td>
                            <td class="status-<?= htmlspecialchars($order['status']) ?>">
                                <?= ucfirst(htmlspecialchars($order['status'])) ?>
                            </td>
                            <td>
                                <button class="action-btn" onclick="viewOrderDetails(<?= $order['id'] ?>)">Ver</button>
                            </td>
                        </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        </div>

        <div id="add" class="tab-content">
            <h2>Adicionar Novo</h2>
            <div class="card">
                <form id="addForm" method="post" action="adicionar-produto.php">
                    <div class="form-group">
                        <label>Tipo:</label>
                        <select id="addType" onchange="changeAddForm()">
                            <option value="product">Conta (Produto)</option>
                            <option value="user">Usuário</option>
                            <option value="order">Pedido</option>
                        </select>
                    </div>

                    <div id="productForm">
                        <div class="form-group">
                            <label>Nome da Conta:</label>
                            <input type="text" name="name" id="productName" placeholder="Ex: Conta Radiante com 50 skins" required>
                        </div>
                        <div class="form-group">
                            <label>Descrição:</label>
                            <input type="text" name="desc" id="productDesc" placeholder="Descrição detalhada da conta" required>
                        </div>
                        <div class="form-group">
                            <label>Rank:</label>
                            <select name="rank" id="productRank" required>
                                <option value="Ferro">Ferro</option>
                                <option value="Bronze">Bronze</option>
                                <option value="Prata">Prata</option>
                                <option value="Ouro">Ouro</option>
                                <option value="Platina">Platina</option>
                                <option value="Diamante">Diamante</option>
                                <option value="Imortal">Imortal</option>
                                <option value="Radiante">Radiante</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Quantidade de Skins:</label>
                            <input type="number" name="skin_count" id="productSkins" placeholder="Número de skins" required>
                        </div>
                        <div class="form-group">
                            <label>Preço (R$):</label>
                            <input type="number" step="0.01" name="price" id="productPrice" placeholder="Preço em reais" required>
                        </div>
                        <button type="submit">Adicionar Conta</button>
                    </div>

                    <div id="userForm" style="display: none;">
                        <div class="form-group">
                            <label>Nome:</label>
                            <input type="text" name="name" id="userName" placeholder="Nome completo" required>
                        </div>
                        <div class="form-group">
                            <label>Email:</label>
                            <input type="email" name="email" id="userEmail" placeholder="Endereço de email" required>
                        </div>
                        <div class="form-group">
                            <label>Senha:</label>
                            <input type="password" name="password" id="userPassword" placeholder="Senha" required>
                        </div>
                        <div class="form-group">
                            <label>Endereço:</label>
                            <input type="text" name="address" id="userAddress" placeholder="Endereço de entrega" required>
                        </div>
                        <div class="form-group">
                            <label>Telefone:</label>
                            <input type="text" name="phone" id="userPhone" placeholder="Número de telefone" required>
                        </div>
                        <button type="button" onclick="addUser()">Adicionar Usuário</button>
                    </div>

                    <div id="orderForm" style="display: none;">
                        <div class="form-group">
                            <label>Usuário:</label>
                            <select id="orderUser" name="user_id" required>
                                <?php foreach ($users as $user): ?>
                                <option value="<?= $user['id'] ?>"><?= htmlspecialchars($user['name']) ?></option>
                                <?php endforeach; ?>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Contas:</label>
                            <div id="orderProducts">
                                <?php foreach ($products as $product): ?>
                                <div>
                                    <input type="checkbox" name="products[]" value="<?= $product['id'] ?>">
                                    <label><?= htmlspecialchars($product['name']) ?> (R$ <?= number_format($product['price'], 2, ',', '.') ?>)</label>
                                </div>
                                <?php endforeach; ?>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Status:</label>
                            <select id="orderStatus" name="status" required>
                                <option value="pendente">Pendente</option>
                                <option value="completo">Completo</option>
                                <option value="cancelado">Cancelado</option>
                            </select>
                        </div>
                        <button type="button" onclick="addOrder()">Realizar Pedido</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script>
        // Função para alternar entre abas
        function openTab(tabName) {
            // Esconde todos os conteúdos de abas
            const tabContents = document.getElementsByClassName('tab-content');
            for (let i = 0; i < tabContents.length; i++) {
                tabContents[i].classList.remove('active');
            }

            // Remove a classe 'active' de todas as abas
            const tabs = document.getElementsByClassName('tab');
            for (let i = 0; i < tabs.length; i++) {
                tabs[i].classList.remove('active');
            }

            // Mostra o conteúdo da aba atual e marca a aba como ativa
            document.getElementById(tabName).classList.add('active');
            event.currentTarget.classList.add('active');
        }

        // Função para alternar entre formulários de adição
        function changeAddForm() {
            const addType = document.getElementById('addType').value;
            
            // Esconde todos os formulários
            document.getElementById('productForm').style.display = 'none';
            document.getElementById('userForm').style.display = 'none';
            document.getElementById('orderForm').style.display = 'none';
            
            // Mostra o formulário selecionado
            document.getElementById(addType + 'Form').style.display = 'block';
        }

        // Funções para adicionar dados (seriam implementadas com AJAX)
        function addProduct() {
            // Implementação com AJAX para adicionar produto
            alert('Produto adicionado com sucesso!');
        }

        function addUser() {
            // Implementação com AJAX para adicionar usuário
            alert('Usuário adicionado com sucesso!');
        }

        function addOrder() {
            // Implementação com AJAX para adicionar pedido
            alert('Pedido realizado com sucesso!');
        }

        // Funções para editar/excluir
        function editProduct(id) {
            alert('Editar produto ID: ' + id);
            // Implementação com AJAX para editar produto
        }

        function deleteProduct(id) {
            if (confirm('Tem certeza que deseja excluir este produto?')) {
                alert('Produto ID: ' + id + ' excluído com sucesso!');
                // Implementação com AJAX para excluir produto
            }
        }

        function viewOrderDetails(id) {
            alert('Visualizar detalhes do pedido ID: ' + id);
            // Implementação com AJAX para visualizar detalhes do pedido
        }
        async function loadProducts() {
    try {
        const response = await fetch('get_products.php');
        const products = await response.json();

        const table = document.getElementById('productsTable').getElementsByTagName('tbody')[0];
        table.innerHTML = '';

        products.forEach(product => {
            const row = table.insertRow();
            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.rank}</td>
                <td>${product.skin_count}</td>
                <td class="price">R$${product.price.toFixed(2)}</td>
                <td><button class="action-btn" onclick="viewProduct(${product.id})">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 9a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5 5 5 0 0 1 5-5 5 5 0 0 1 5 5 5 5 0 0 1-5 5m0-12.5C7 4.5 2.7 7.6 1 12c1.7 4.4 6 7.5 11 7.5s9.3-3.1 11-7.5c-1.7-4.4-6-7.5-11-7.5z"/></svg>
                    Ver
                </button></td>
            `;
        });
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
    }
}

async function addProduct() {
    const product = {
        name: document.getElementById('productName').value,
        desc: document.getElementById('productDesc').value,
        rank: document.getElementById('productRank').value,
        skin_count: document.getElementById('productSkins').value,
        price: document.getElementById('productPrice').value
    };

    if (!product.name || !product.price) {
        alert('Preencha todos os campos obrigatórios!');
        return;
    }

    try {
        const response = await fetch('add_product.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product)
        });

        const result = await response.json();
        alert(result.message);

        // Limpar formulário
        document.getElementById('productName').value = '';
        document.getElementById('productDesc').value = '';
        document.getElementById('productSkins').value = '';
            document.getElementById('productPrice').value = '';
            // You may want to reload the products after adding
            loadProducts();
            // Optionally, switch to the products tab if you have tab logic
            // openTab('products');
        } catch (error) {
            console.error('Erro ao adicionar produto:', error);
            alert('Erro ao adicionar produto!');
        }
    }
    
    // The following functions should be defined at the top level, not inside another function or try/catch
    
    function openTab(tabName) {
        const tabContents = document.getElementsByClassName('tab-content');
        for (let i = 0; i < tabContents.length; i++) {
            tabContents[i].classList.remove('active');
        }
    
        const tabs = document.getElementsByClassName('tab');
        for (let i = 0; i < tabs.length; i++) {
            tabs[i].classList.remove('active');
        }
    
        document.getElementById(tabName).classList.add('active');
        event.currentTarget.classList.add('active');
    
        if (tabName === 'products') {
            loadProducts();
        } else if (tabName === 'users') {
            loadUsers();
        } else if (tabName === 'orders') {
            loadOrders();
        } else if (tabName === 'add') {
            changeAddForm();
        }
    }
    
    function changeAddForm() {
        const type = document.getElementById('addType').value;
        document.getElementById('productForm').style.display = 'none';
        document.getElementById('userForm').style.display = 'none';
        document.getElementById('orderForm').style.display = 'none';
    
        if (type === 'product') {
            document.getElementById('productForm').style.display = 'block';
        } else if (type === 'user') {
            document.getElementById('userForm').style.display = 'block';
        } else if (type === 'order') {
            document.getElementById('orderForm').style.display = 'block';
            loadUsersForOrder();
            loadProductsForOrder();
        }
    }
    
    function loadUsers() {
        const users = [
            { id: 1, name: "João Silva", email: "joao@exemplo.com", phone: "(11) 98765-4321" },
            { id: 2, name: "Maria Souza", email: "maria@exemplo.com", phone: "(21) 99876-5432" }
        ];
    
        const table = document.getElementById('usersTable').getElementsByTagName('tbody')[0];
        table.innerHTML = '';
    
        users.forEach(user => {
            const row = table.insertRow();
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
            `;
        });
    }
    
    function loadOrders() {
        const orders = [
            { id: 1, user_id: 1, user_name: "João Silva", date: "15/05/2023", status: "completo" },
            { id: 2, user_id: 2, user_name: "Maria Souza", date: "16/05/2023", status: "pendente" }
        ];
    
        const table = document.getElementById('ordersTable').getElementsByTagName('tbody')[0];
        table.innerHTML = '';
    
        orders.forEach(order => {
            const row = table.insertRow();
            row.innerHTML = `
                <td>${order.id}</td>
                <td>${order.user_name}</td>
                <td>${order.date}</td>
                <td class="status-${order.status}">${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</td>
                <td><button class="action-btn" onclick="viewOrder(${order.id})">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 9a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5 5 5 0 0 1 5-5 5 5 0 0 1 5 5 5 5 0 0 1-5 5m0-12.5C7 4.5 2.7 7.6 1 12c1.7 4.4 6 7.5 11 7.5s9.3-3.1 11-7.5c-1.7-4.4-6-7.5-11-7.5z"/></svg>
                    Detalhes
                </button></td>
            `;
        });
    }
    
    function loadUsersForOrder() {
        const select = document.getElementById('orderUser');
        select.innerHTML = '<option value="">Selecione um usuário</option>';
    
        const users = [
            { id: 1, name: "João Silva" },
            { id: 2, name: "Maria Souza" }
        ];
    
        users.forEach(user => {
            const option = document.createElement('option');
            option.value = user.id;
            option.textContent = user.name;
            select.appendChild(option);
        });
    }
    
    function loadProductsForOrder() {
        const container = document.getElementById('orderProducts');
        container.innerHTML = '';
    
        const products = [
            { id: 1, name: "Conta Radiante", price: 1499.99 },
            { id: 2, name: "Smurf Imortal", price: 799.99 },
            { id: 3, name: "Diamante com Skins", price: 999.99 }
        ];
    
        products.forEach(product => {
            const div = document.createElement('div');
            div.style.marginBottom = '10px';
            div.style.display = 'flex';
            div.style.alignItems = 'center';
            div.style.gap = '10px';
            div.innerHTML = `
                <input type="checkbox" id="product_${product.id}" value="${product.id}">
                <label for="product_${product.id}" style="margin-bottom: 0; flex-grow: 1;">${product.name} (R$${product.price.toFixed(2)})</label>
                <input type="number" id="qty_${product.id}" min="1" value="1" style="width: 80px;">
            `;
            container.appendChild(div);
        });
    }
    
    function addUser() {
        const user = {
            name: document.getElementById('userName').value,
            email: document.getElementById('userEmail').value,
            password: document.getElementById('userPassword').value,
            address: document.getElementById('userAddress').value,
            phone: document.getElementById('userPhone').value
        };
    
        if (!user.name || !user.email || !user.password) {
            alert('Preencha todos os campos obrigatórios!');
            return;
        }
    
        alert('Usuário adicionado com sucesso!');
        document.getElementById('userName').value = '';
        document.getElementById('userEmail').value = '';
        document.getElementById('userPassword').value = '';
        document.getElementById('userAddress').value = '';
        document.getElementById('userPhone').value = '';
    
        loadUsers();
        openTab('users');
    }
    
    function addOrder() {
        const userId = document.getElementById('orderUser').value;
        const status = document.getElementById('orderStatus').value;
    
        if (!userId) {
            alert('Selecione um usuário!');
            return;
        }
    
        const products = [];
        const checkboxes = document.querySelectorAll('#orderProducts input[type="checkbox"]:checked');
    
        if (checkboxes.length === 0) {
            alert('Selecione pelo menos uma conta!');
            return;
        }
    
        checkboxes.forEach(checkbox => {
            const productId = checkbox.value;
            const quantity = document.getElementById(`qty_${productId}`).value;
            products.push({ productId, quantity });
        });
    
        alert('Pedido realizado com sucesso!');
        loadOrders();
        openTab('orders');
    }
    
    function viewProduct(id) {
        alert(`Detalhes da conta ID: ${id}\n\nEsta função exibiria mais detalhes em uma implementação completa.`);
    }
    
    function viewOrder(id) {
        alert(`Detalhes do pedido ID: ${id}\n\nEsta função exibiria os itens do pedido em uma implementação completa.`);
    }
    
    window.onload = function () {
        loadProducts();
    };
    // Funções para adicionar dados
function addProduct() {
    const formData = {
        name: document.getElementById('productName').value,
        desc: document.getElementById('productDesc').value,
        rank: document.getElementById('productRank').value,
        skin_count: document.getElementById('productSkins').value,
        price: document.getElementById('productPrice').value
    };

    fetch('adicionar-produto.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(data.message);
            location.reload();
        } else {
            alert('Erro: ' + data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}

function addUser() {
    const formData = {
        name: document.getElementById('userName').value,
        email: document.getElementById('userEmail').value,
        password: document.getElementById('userPassword').value,
        address: document.getElementById('userAddress').value,
        phone: document.getElementById('userPhone').value
    };

    fetch('adicionar-usuario.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(data.message);
            location.reload();
        } else {
            alert('Erro: ' + data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}

function addOrder() {
    const products = [];
    document.querySelectorAll('#orderProducts input[type="checkbox"]:checked').forEach(checkbox => {
        products.push(checkbox.value);
    });

    const formData = {
        user_id: document.getElementById('orderUser').value,
        products: products,
        status: document.getElementById('orderStatus').value
    };

    fetch('adicionar-pedido.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(data.message);
            location.reload();
        } else {
            alert('Erro: ' + data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}

// Funções para editar/excluir
function editProduct(id) {
    // Aqui você implementaria a lógica para buscar os dados do produto
    // e preencher um formulário de edição
    const newName = prompt("Digite o novo nome do produto:");
    if (newName) {
        fetch('editar-produto.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id, name: newName })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            if (data.success) location.reload();
        })
        .catch(error => console.error('Error:', error));
    }
}

function deleteProduct(id) {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
        fetch('excluir-produto.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            if (data.success) location.reload();
        })
        .catch(error => console.error('Error:', error));
    }
}

function viewOrderDetails(id) {
    fetch(`detalhes-pedido.php?id=${id}`)
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            let message = `Pedido #${data.data.id}\n`;
            message += `Usuário: ${data.data.user_name}\n`;
            message += `Data: ${data.data.order_date}\n`;
            message += `Status: ${data.data.status}\n\n`;
            message += `Produtos:\n`;
            
            data.data.products.forEach(product => {
                message += `- ${product.name} (R$ ${product.price.toFixed(2)})\n`;
            });

            alert(message);
        } else {
            alert('Erro: ' + data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}
    </script>
</body>
</html>