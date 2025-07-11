<?php
require 'config.php';

header('Content-Type: application/json');

$orderId = $_GET['id'] ?? null;

if (empty($orderId)) {
    echo json_encode(['success' => false, 'message' => 'ID do pedido não fornecido']);
    exit;
}

// Busca informações básicas do pedido
$stmt = $pdo->prepare('SELECT o.*, u.name as user_name FROM orders o JOIN users u ON o.user_id = u.id WHERE o.id = ?');
$stmt->execute([$orderId]);
$order = $stmt->fetch();

if (!$order) {
    echo json_encode(['success' => false, 'message' => 'Pedido não encontrado']);
    exit;
}

// Busca produtos do pedido
$stmt = $pdo->prepare('SELECT p.* FROM products p JOIN order_products op ON p.id = op.product_id WHERE op.order_id = ?');
$stmt->execute([$orderId]);
$products = $stmt->fetchAll();

$order['products'] = $products;

echo json_encode(['success' => true, 'data' => $order]);
?>