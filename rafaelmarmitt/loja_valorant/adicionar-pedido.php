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

    // Insere o pedido
    $stmt = $pdo->prepare('INSERT INTO orders (user_id, order_date, status) VALUES (?, NOW(), ?)');
    $stmt->execute([$data['user_id'], $data['status']]);
    $orderId = $pdo->lastInsertId();

    // Insere os produtos do pedido
    $stmt = $pdo->prepare('INSERT INTO order_products (order_id, product_id) VALUES (?, ?)');
    foreach ($data['products'] as $productId) {
        $stmt->execute([$orderId, $productId]);
    }

    $pdo->commit();

    echo json_encode(['success' => true, 'message' => 'Pedido realizado com sucesso', 'order_id' => $orderId]);
} catch (Exception $e) {
    $pdo->rollBack();
    echo json_encode(['success' => false, 'message' => 'Erro ao processar pedido: ' . $e->getMessage()]);
}
?>