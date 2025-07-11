<?php
require 'config.php';

header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

// Validação básica
if (empty($data['name']) || empty($data['email']) || empty($data['password'])) {
    echo json_encode(['success' => false, 'message' => 'Campos obrigatórios faltando']);
    exit;
}

// Verifica se o email já existe
$stmt = $pdo->prepare('SELECT id FROM users WHERE email = ?');
$stmt->execute([$data['email']]);
if ($stmt->rowCount() > 0) {
    echo json_encode(['success' => false, 'message' => 'Email já cadastrado']);
    exit;
}

// Hash da senha
$hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);

// Insere o usuário
$stmt = $pdo->prepare('INSERT INTO users (name, email, password, address, phone) VALUES (?, ?, ?, ?, ?)');
$stmt->execute([
    $data['name'],
    $data['email'],
    $hashedPassword,
    $data['address'] ?? null,
    $data['phone'] ?? null
]);

echo json_encode(['success' => true, 'message' => 'Usuário adicionado com sucesso', 'id' => $pdo->lastInsertId()]);
?>