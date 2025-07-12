<?php
require 'config.php';
session_start();

// Verifica se o usuário está logado
if (!isset($_SESSION['user_id'])) {
    header('Location: login.php');
    exit;
}

// Funções para buscar dados
function getProducts($pdo)
{
    $stmt = $pdo->query('SELECT * FROM products');
    return $stmt->fetchAll();
}

function getUsers($pdo)
{
    $stmt = $pdo->query('SELECT id, name, email, phone FROM users');
    return $stmt->fetchAll();
}

function getOrders($pdo)
{
    $stmt = $pdo->query('SELECT o.id, u.name as user_name, o.order_date, o.status, o.total 
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
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <link rel="stylesheet" href="style.css">
    <style>
        :root {
            --primary: #ff4655;
            --primary-dark: #d33c4a;
            --dark: #0f1923;
            --darker: #0a141e;
            --light: #ece8e1;
            --gray: #768079;
            --success: #2ecc71;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Poppins', sans-serif;
        }

        #productDesc {
            background-color: var(--dark);
            color: var(--light);
            line-height: 1.6;
        }

        body {
            background-color: var(--dark);
            color: var(--light);
            line-height: 1.6;
        }

        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

        header {
            background-color: var(--darker);
            color: var(--light);
            padding: 1.5rem;
            text-align: center;
            border-bottom: 2px solid var(--primary);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .container {
            width: 90%;
            max-width: 1200px;
            margin: 2rem auto;
            overflow: hidden;
        }

        .card {
            background: var(--darker);
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            margin: 1.5rem 0;
            padding: 1.5rem;
            border: 1px solid rgba(255, 255, 255, 0.05);
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin: 1rem 0;
        }

        table,
        th,
        td {
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        th,
        td {
            padding: 14px;
            text-align: left;
        }

        th {
            background-color: var(--primary);
            color: white;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-size: 0.85rem;
        }

        tr:nth-child(even) {
            background-color: rgba(255, 255, 255, 0.03);
        }

        tr:hover {
            background-color: rgba(255, 255, 255, 0.05);
        }

        button {
            background-color: var(--primary);
            color: white;
            border: none;
            padding: 10px 18px;
            border-radius: 4px;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.3s ease;
            text-transform: uppercase;
            font-size: 0.8rem;
            letter-spacing: 1px;
        }

        button:hover {
            background-color: var(--primary-dark);
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(255, 70, 85, 0.3);
        }

        .form-group {
            margin-bottom: 1.5rem;
            color: var(--dark);
        }

        label {
            display: block;
            margin-bottom: 0.7rem;
            color: var(--gray);
            font-size: 0.9rem;
            font-weight: 500;
        }

        input,
        select {
            width: 100%;
            padding: 12px;
            background-color: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 4px;
            color: var(--light);
            font-size: 0.95rem;
            transition: all 0.3s ease;
        }

        input:focus,
        select:focus {
            outline: none;
            border-color: var(--primary);
            box-shadow: 0 0 0 2px rgba(255, 70, 85, 0.2);
        }

        .tabs {
            display: flex;
            margin-bottom: 1.5rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .tab {
            padding: 12px 24px;
            background: transparent;
            cursor: pointer;
            margin-right: 2px;
            font-weight: 500;
            color: var(--gray);
            transition: all 0.3s ease;
            border-bottom: 3px solid transparent;
        }

        .tab:hover {
            color: var(--light);
        }

        .tab.active {
            color: var(--primary);
            border-bottom: 3px solid var(--primary);
            background-color: rgba(255, 70, 85, 0.1);
        }

        .tab-content {
            display: none;
            animation: fadeIn 0.5s ease;
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(10px);
            }

            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .tab-content.active {
            display: block;
        }

        h1,
        h2,
        h3 {
            color: var(--light);
            margin-bottom: 1.5rem;
            font-weight: 600;
        }

        h1 {
            font-size: 2.2rem;
            letter-spacing: 1px;
        }

        h2 {
            font-size: 1.5rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            padding-bottom: 0.5rem;
            margin-bottom: 1.5rem;
        }

        .price {
            color: var(--primary);
            font-weight: 600;
        }

        .status-completed {
            color: var(--success);
        }

        .status-pending {
            color: #f39c12;
        }

        .status-cancelled {
            color: #e74c3c;
        }

        .action-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
        }

        .action-btn svg {
            width: 16px;
            height: 16px;
            fill: currentColor;
        }

        @media (max-width: 768px) {
            .container {
                width: 95%;
            }

            .tabs {
                overflow-x: auto;
                white-space: nowrap;
                padding-bottom: 5px;
            }

            .tab {
                padding: 10px 16px;
                font-size: 0.85rem;
            }

            th,
            td {
                padding: 10px;
                font-size: 0.85rem;
            }
        }
    </style>
</head>

<body>
    <header>
        <h1>LOJA DE CONTAS VALORANT</h1>
        <div style="text-align: right; margin-top: -40px;">
            <a href="logout.php" style="color: white; text-decoration: none;">Sair</a>
        </div>
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
                                <td><?= htmlspecialchars($product['ranque']) ?></td>
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
                    <!-- Dentro da tabela de pedidos (procure por <table id="ordersTable">) -->
                    <thead>
                        <tr>
                            <th>ID Pedido</th>
                            <th>Usuário</th>
                            <th>Data</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($orders as $order): ?>
                            <tr>
                                <td><?= htmlspecialchars($order['id']) ?></td>
                                <td><?= htmlspecialchars($order['user_name']) ?></td>
                                <td><?= date('d/m/Y H:i', strtotime($order['order_date'])) ?></td>
                                <td>R$ <?= number_format($order['total'], 2, ',', '.') ?></td>
                                <td class="status-<?= htmlspecialchars($order['status']) ?>">
                                    <?= ucfirst(htmlspecialchars($order['status'])) ?>
                                </td>
                                <td>
                                    <button class="action-btn" onclick="viewOrderDetails(<?= $order['id'] ?>)">
                                        <i class="fas fa-eye"></i> Ver
                                    </button>
                                    <?php if ($order['status'] == 'pendente'): ?>
                                        <button class="action-btn success" onclick="completeOrder(<?= $order['id'] ?>)">
                                            <i class="fas fa-check"></i> Concluir
                                        </button>
                                    <?php endif; ?>
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
                <form id="addForm" method="post" onsubmit="return false;">
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
                            <textarea name="desc" id="productDesc" placeholder="Descrição detalhada da conta" required></textarea>
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
                        <button type="button" onclick="addProduct()">Adicionar Conta</button>
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
                            <input type="text" name="address" id="userAddress" placeholder="Endereço de entrega">
                        </div>
                        <div class="form-group">
                            <label>Telefone:</label>
                            <input type="text" name="phone" id="userPhone" placeholder="Número de telefone">
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
                                    <div style="margin-bottom: 10px;">
                                        <input type="checkbox" name="products[]" value="<?= $product['id'] ?>"
                                            data-price="<?= $product['price'] ?>"
                                            onchange="calculateTotal()">
                                        <label><?= htmlspecialchars($product['name']) ?> (R$ <?= number_format($product['price'], 2, ',', '.') ?>)</label>
                                        <input type="number" name="quantities[]" value="1" min="1" style="width: 60px; margin-left: 10px;"
                                            onchange="calculateTotal()">
                                    </div>
                                <?php endforeach; ?>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Total:</label>
                            <input type="text" id="orderTotal" value="R$ 0,00" readonly>
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

            // Se for o formulário de pedido, calcula o total
            if (addType === 'order') {
                calculateTotal();
            }
        }

        // Função para calcular o total do pedido
        function calculateTotal() {
            const checkboxes = document.querySelectorAll('#orderProducts input[type="checkbox"]:checked');
            let total = 0;

            checkboxes.forEach(checkbox => {
                const quantity = checkbox.nextElementSibling.nextElementSibling.value;
                const price = parseFloat(checkbox.dataset.price);
                total += price * quantity;
            });

            document.getElementById('orderTotal').value = 'R$ ' + total.toFixed(2).replace('.', ',');
        }

        // Funções para adicionar dados via AJAX
        async function addProduct() {
            const product = {
                name: document.getElementById('productName').value,
                desc: document.getElementById('productDesc').value,
                ranque: document.getElementById('productRank').value,
                skin_count: document.getElementById('productSkins').value,
                price: document.getElementById('productPrice').value
            };

            try {
                const response = await fetch('adicionar-produto.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(product)
                });

                const result = await response.json();
                alert(result.message);

                if (result.success) {
                    // Limpar formulário
                    document.getElementById('productName').value = '';
                    document.getElementById('productDesc').value = '';
                    document.getElementById('productSkins').value = '';
                    document.getElementById('productPrice').value = '';

                    // Recarregar a página para atualizar a lista
                    location.reload();
                }
            } catch (error) {
                console.error('Erro:', error);
                alert('Erro ao adicionar produto');
            }
        }

        async function addUser() {
            const user = {
                name: document.getElementById('userName').value,
                email: document.getElementById('userEmail').value,
                password: document.getElementById('userPassword').value,
                address: document.getElementById('userAddress').value,
                phone: document.getElementById('userPhone').value
            };

            try {
                const response = await fetch('adicionar-usuario.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(user)
                });

                const result = await response.json();
                alert(result.message);

                if (result.success) {
                    // Limpar formulário
                    document.getElementById('userName').value = '';
                    document.getElementById('userEmail').value = '';
                    document.getElementById('userPassword').value = '';
                    document.getElementById('userAddress').value = '';
                    document.getElementById('userPhone').value = '';

                    // Recarregar a página para atualizar a lista
                    location.reload();
                }
            } catch (error) {
                console.error('Erro:', error);
                alert('Erro ao adicionar usuário');
            }
        }

        async function addOrder() {
            const userId = document.getElementById('orderUser').value;
            const status = document.getElementById('orderStatus').value;
            const products = [];

            document.querySelectorAll('#orderProducts input[type="checkbox"]:checked').forEach(checkbox => {
                const productId = checkbox.value;
                const quantity = checkbox.nextElementSibling.nextElementSibling.value;
                products.push({
                    productId,
                    quantity
                });
            });

            if (products.length === 0) {
                alert('Selecione pelo menos um produto!');
                return;
            }

            try {
                const response = await fetch('adicionar-pedido.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        user_id: userId,
                        products,
                        status
                    })
                });

                const result = await response.json();
                alert(result.message);

                if (result.success) {
                    // Recarregar a página para atualizar a lista
                    location.reload();
                }
            } catch (error) {
                console.error('Erro:', error);
                alert('Erro ao adicionar pedido');
            }
        }

        // Funções para editar/excluir
        async function editProduct(id) {
            try {
                // 1. Busca os dados atuais do produto
                const response = await fetch(`buscar-produto.php?id=${id}`);
                const product = await response.json();

                if (!product) {
                    alert('Produto não encontrado!');
                    return;
                }

                // 2. Exibe um formulário de edição
                const newName = prompt("Editar nome do produto:", product.name);
                if (!newName) return;

                const newRank = prompt("Editar rank:", product.ranque);
                if (!newRank) return;

                const newSkins = prompt("Editar quantidade de skins:", product.skin_count);
                if (!newSkins) return;

                const newPrice = prompt("Editar preço:", product.price);
                if (!newPrice) return;

                // 3. Envia os dados atualizados
                
                const updateResponse = await fetch('editar-produto.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: id,
                        name: newName,
                        ranque: newRank,
                        skin_count: newSkins,
                        price: newPrice
                    })
                });

                const result = await updateResponse.json();
                alert(result.message);

                if (result.success) {
                    location.reload(); // Atualiza a página
                }
            } catch (error) {
                console.error('Erro ao editar produto:', error);
                alert('Erro ao editar produto');
            }
        }
        async function deleteProduct(id) {
            if (!confirm('Tem certeza que deseja excluir este produto?')) return;

            try {
                const response = await fetch('excluir-produto.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id
                    })
                });

                const result = await response.json();
                alert(result.message);

                if (result.success) {
                    location.reload();
                }
            } catch (error) {
                console.error('Erro:', error);
                alert('Erro ao excluir produto');
            }
        }

        async function viewOrderDetails(id) {
            try {
                const response = await fetch(`detalhes-pedido.php?id=${id}`);
                const result = await response.json();

                if (result.success) {
                    let message = `Pedido #${result.data.id}\n`;
                    message += `Usuário: ${result.data.user_name}\n`;
                    message += `Data: ${new Date(result.data.order_date).toLocaleString()}\n`;
                    message += `Status: ${result.data.status}\n`;
                    message += `Total: R$ ${parseFloat(result.data.total).toFixed(2)}\n\n`;
                    message += `Produtos:\n`;

                    result.data.products.forEach(product => {
                        message += `- ${product.name} (R$ ${parseFloat(product.price).toFixed(2)})\n`;
                    });

                    alert(message);
                } else {
                    alert('Erro: ' + result.message);
                }
            } catch (error) {
                console.error('Erro:', error);
                alert('Erro ao carregar detalhes do pedido');
            }
        }
        async function completeOrder(orderId) {
            if (!confirm('Deseja realmente marcar este pedido como concluído?')) {
                return;
            }

            try {
                const response = await fetch('concluir-pedido.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        order_id: orderId
                    })
                });

                const result = await response.json();
                alert(result.message);

                if (result.success) {
                    // Atualiza a página para mostrar as mudanças
                    location.reload();
                }
            } catch (error) {
                console.error('Erro:', error);
                alert('Erro ao concluir pedido');
            }
        }
    </script>
</body>

</html>