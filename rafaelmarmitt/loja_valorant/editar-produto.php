<?php
require 'config.php';

header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

// Validação dos campos
if (empty($data['id']) || empty($data['name']) || empty($data['ranque']) || 
    empty($data['skin_count']) || empty($data['price'])) {
    echo json_encode(['success' => false, 'message' => 'Todos os campos são obrigatórios']);
    exit;
}

try {
    $stmt = $pdo->prepare('UPDATE products SET 
                          name = ?, 
                          ranque = ?, 
                          skin_count = ?, 
                          price = ? 
                          WHERE id = ?');
    
    $success = $stmt->execute([
        $data['name'],
        $data['ranque'],
        $data['skin_count'],
        $data['price'],
        $data['id']
    ]);

    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => true, 'message' => 'Produto atualizado com sucesso']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Nenhuma alteração foi feita']);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Erro ao atualizar produto: ' . $e->getMessage()]);
}
?>