<?php
require 'config.php';

header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

// Validação básica
if (empty($data['user_id']) || empty($data['products']) || empty($data['status'])) {
    echo json_encode(['success' => false, 'message' => 'Campos obrigatórios faltando']);
    exit;
}

try {
    $pdo->beginTransaction();

    // Primeiro calcula o total
    $total = 0;
    $productIds = array_column($data['products'], 'productId');
    
    // Busca os preços dos produtos
    $placeholders = implode(',', array_fill(0, count($productIds), '?'));
    $stmt = $pdo->prepare("SELECT id, price FROM products WHERE id IN ($placeholders)");
    $stmt->execute($productIds);
    $productsInfo = $stmt->fetchAll(PDO::FETCH_KEY_PAIR);
    
    foreach ($data['products'] as $item) {
        if (isset($productsInfo[$item['productId']])) {
            $total += $productsInfo[$item['productId']] * $item['quantity'];
        }
    }

    // Insere o pedido
    $stmt = $pdo->prepare('INSERT INTO orders (user_id, order_date, status, total) VALUES (?, NOW(), ?, ?)');
    $stmt->execute([$data['user_id'], $data['status'], $total]);
    $orderId = $pdo->lastInsertId();

    // Insere os produtos do pedido
    $stmt = $pdo->prepare('INSERT INTO order_products (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)');
    foreach ($data['products'] as $item) {
        if (isset($productsInfo[$item['productId']])) {
            $stmt->execute([
                $orderId,
                $item['productId'],
                $item['quantity'],
                $productsInfo[$item['productId']]
            ]);
        }
    }

    $pdo->commit();

    echo json_encode(['success' => true, 'message' => 'Pedido realizado com sucesso', 'order_id' => $orderId]);
} catch (Exception $e) {
    $pdo->rollBack();
    echo json_encode(['success' => false, 'message' => 'Erro ao processar pedido: ' . $e->getMessage()]);
}