<?php
require 'config.php';

header('Content-Type: application/json');

$productId = $_GET['id'] ?? null;

if (empty($productId)) {
    echo json_encode(null);
    exit;
}

$stmt = $pdo->prepare('SELECT * FROM products WHERE id = ?');
$stmt->execute([$productId]);
$product = $stmt->fetch();

echo json_encode($product);
?>