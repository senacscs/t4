<?php
define('ENVIRONMENT', 'development');

// Configurações básicas
$host = 'localhost';
$db   = 'loja_valorant';
$user = 'root';
$pass = 'Rafachick1';

// Verifica a versão do MySQL para definir o charset adequado
$charset = 'utf8';

// Tenta detectar se o servidor suporta utf8mb4
try {
    $testConnection = new PDO("mysql:host=$host", $user, $pass);
    $version = $testConnection->getAttribute(PDO::ATTR_SERVER_VERSION);
    
    if (version_compare($version, '5.5.3', '>=')) {
        $charset = 'utf8mb4';
    }
    unset($testConnection);
} catch (PDOException $e) {
    // Mantém utf8 como fallback
}

// Configuração DSN
$dsn = "mysql:host=$host;dbname=$db;charset=$charset";

// Opções do PDO
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
    PDO::ATTR_PERSISTENT         => false,
    PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES $charset"
];

// Conexão principal
try {
    $pdo = new PDO($dsn, $user, $pass, $options);
    
    // Configuração adicional pós-conexão
    $pdo->exec("SET time_zone = '-03:00';"); // Fuso horário do Brasil
} catch (\PDOException $e) {
    // Tratamento de erro mais informativo
    $errorMessage = "Erro de conexão com o banco de dados: " . $e->getMessage();
    $errorMessage .= "\nVerifique:";
    $errorMessage .= "\n- Servidor MySQL está rodando?";
    $errorMessage .= "\n- Credenciais estão corretas?";
    $errorMessage .= "\n- Banco de dados '{$db}' existe?";
    $errorMessage .= "\n- Usuário '{$user}' tem permissões?";
    
    // Log em arquivo (útil para produção)
    error_log($errorMessage, 3, __DIR__.'/database_errors.log');
    
    // Exibe mensagem amigável (apenas em desenvolvimento)
    if (defined('ENVIRONMENT') && ENVIRONMENT === 'development') {
        die("<h1>Erro de conexão com o banco de dados</h1><pre>{$errorMessage}</pre>");
    } else {
        die("Erro no sistema. Por favor, tente novamente mais tarde.");
    }
}

// Funções úteis (opcional)
function getPDO() {
    global $pdo;
    return $pdo;
}

function closeConnection() {
    global $pdo;
    $pdo = null;
}

// Se estiver tentando acessar login/register já estando logado
if (basename($_SERVER['PHP_SELF']) == 'login.php' || basename($_SERVER['PHP_SELF']) == 'register.php') {
    if (isset($_SESSION['user_id'])) {
        header('Location: index.php');
        exit;
    }
}
