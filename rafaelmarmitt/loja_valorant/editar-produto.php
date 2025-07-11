<?php
require 'config.php';

header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

if (empty($data['id']) || empty($data['name']) || empty($data['rank']) || empty($data['skin_count']) || empty($data['price'])) {
    echo json_encode(['success' => false, 'message' => 'Campos obrigatórios faltando']);
    exit;
}

$stmt = $pdo->prepare('UPDATE products SET name = ?, description = ?, rank = ?, skin_count = ?, price = ? WHERE id = ?');
$stmt->execute([
    $data['name'],
    $data['desc'] ?? '',
    $data['rank'],
    $data['skin_count'],
    $data['price'],
    $data['id']
]);

if ($stmt->rowCount() > 0) {
    echo json_encode(['success' => true, 'message' => 'Produto atualizado com sucesso']);
} else {
    echo json_encode(['success' => false, 'message' => 'Nenhum produto encontrado com este ID']);
}
?>