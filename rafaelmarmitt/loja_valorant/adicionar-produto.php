<?php
require 'config.php';

header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

$stmt = $pdo->prepare('INSERT INTO products (name, description, ranque, skin_count, price) VALUES (?, ?, ?, ?, ?)');
$stmt->execute([
    $data['name'],
    $data['desc'],
    $data['ranque'],
    $data['skin_count'],
    $data['price']
]);

echo json_encode(['success' => true, 'message' => 'Produto adicionado com sucesso']);
?>