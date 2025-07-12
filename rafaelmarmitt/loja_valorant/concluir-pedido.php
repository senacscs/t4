<?php
require 'config.php';
session_start();

header('Content-Type: application/json');

// Verifica se o usuário está logado
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Acesso não autorizado']);
    exit;
}

// Pega o ID do pedido
$data = json_decode(file_get_contents('php://input'), true);
$orderId = $data['order_id'] ?? null;

if (empty($orderId)) {
    echo json_encode(['success' => false, 'message' => 'ID do pedido não fornecido']);
    exit;
}

try {
    // Verifica se o pedido existe e está pendente
    $stmt = $pdo->prepare('SELECT id FROM orders WHERE id = ? AND status = "pendente"');
    $stmt->execute([$orderId]);
    
    if ($stmt->rowCount() === 0) {
        echo json_encode(['success' => false, 'message' => 'Pedido não encontrado ou já concluído/cancelado']);
        exit;
    }

    // Atualiza o status do pedido (versão com completed_at)
    $stmt = $pdo->prepare('UPDATE orders SET status = "completo", completed_at = NOW() WHERE id = ?');
    // Se não quiser usar completed_at, use:
    // $stmt = $pdo->prepare('UPDATE orders SET status = "completo" WHERE id = ?');
    
    $stmt->execute([$orderId]);

    echo json_encode(['success' => true, 'message' => 'Pedido #' . $orderId . ' concluído com sucesso']);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Erro ao concluir pedido: ' . $e->getMessage()]);
}