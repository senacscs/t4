<?php
require 'config.php';

header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

if (empty($data['id'])) {
    echo json_encode(['success' => false, 'message' => 'ID do produto não fornecido']);
    exit;
}

// Verifica se o produto existe em algum pedido antes de excluir
$stmt = $pdo->prepare('SELECT COUNT(*) FROM order_products WHERE product_id = ?');
$stmt->execute([$data['id']]);
$count = $stmt->fetchColumn();

if ($count > 0) {
    echo json_encode(['success' => false, 'message' => 'Este produto está associado a pedidos e não pode ser excluído']);
    exit;
}

$stmt = $pdo->prepare('DELETE FROM products WHERE id = ?');
$stmt->execute([$data['id']]);

if ($stmt->rowCount() > 0) {
    echo json_encode(['success' => true, 'message' => 'Produto excluído com sucesso']);
} else {
    echo json_encode(['success' => false, 'message' => 'Nenhum produto encontrado com este ID']);
}
?>