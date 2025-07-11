<?php
require 'config.php';

header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

$stmt = $pdo->prepare('INSERT INTO products (name, description, rank, skin_count, price) VALUES (?, ?, ?, ?, ?)');
$stmt->execute([
    $data['name'],
    $data['desc'],
    $data['rank'],
    $data['skin_count'],
    $data['price']
]);

echo json_encode(['success' => true, 'message' => 'Produto adicionado com sucesso']);
?>