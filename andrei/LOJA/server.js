const express = require('express');
const mysql = require('mysql2');

const app = express();
const PORT = 3000;

// Middlewares mínimos
app.use(express.json());                         // se usar fetch JSON
app.use(express.static(__dirname));  // serve HTML/JS

// Conexão MySQL (ajuste usuário/senha/banco conforme seu Workbench)
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',             // <-- ajuste aqui
  database: 'ecommerce_simples',   // criado no schema.sql
  port: 3307                     // padrão MySQL
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar no MySQL:', err);
    process.exit(1);
  }
  console.log('Conectado ao MySQL!');
});

// ROTAS BÁSICAS

// Cadastrar usuário 
app.post('/cadastrar-usuario', (req, res) => {
  const { nome, usuario, email, cpf, senha } = req.body;

  if (!nome || !usuario || !email || !cpf || !senha) {
    return res.status(400).json({ status: 'Preencha todos os campos.' });
  }

  const sql = `
    INSERT INTO usuarios (nome, usuario, email, cpf, senha)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.query(sql, [nome, usuario, email, cpf, senha], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ status: 'Erro ao cadastrar usuário.' });
    }
    res.json({ status: 'Usuário cadastrado com sucesso!', id: result.insertId });
  });
});

// Listar usuários (SELECT simples)
app.get('/listar-usuarios', (req, res) => {
  const sql = `SELECT id, nome, usuario, email, cpf FROM usuarios ORDER BY id DESC`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ status: 'Erro ao listar usuários.' });
    res.json(results);
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
