<?php
require 'config.php';

header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

if (empty($data['id']) || empty($data['status'])) {
    echo json_encode(['success' => false, 'message' => 'Campos obrigatórios faltando']);
    exit;
}

$allowedStatus = ['pendente', 'completo', 'cancelado'];
if (!in_array($data['status'], $allowedStatus)) {
    echo json_encode(['success' => false, 'message' => 'Status inválido']);
    exit;
}

$stmt = $pdo->prepare('UPDATE orders SET status = ? WHERE id = ?');
$stmt->execute([$data['status'], $data['id']]);

if ($stmt->rowCount() > 0) {
    echo json_encode(['success' => true, 'message' => 'Status do pedido atualizado com sucesso']);
} else {
    echo json_encode(['success' => false, 'message' => 'Nenhum pedido encontrado com este ID']);
}
?>