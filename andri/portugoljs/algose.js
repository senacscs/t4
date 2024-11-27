// script.js

function exemplo1() {
    let nome = prompt("Digite o seu nome: ");
    document.getElementById("saidaExemplo1").textContent = "Olá, " + nome;
  }
  
  function operacoesAritmeticas() {
    let a = parseFloat(prompt("Digite o primeiro número: "));
    let b = parseFloat(prompt("Digite o segundo número: "));
    let c = a + b;
    document.getElementById("saidaOperacoes").textContent = "A soma é: " + c;
  }
  
  function calcularMedia() {
    let n1 = parseFloat(prompt("Digite o primeiro número: "));
    let n2 = parseFloat(prompt("Digite o segundo número: "));
    let n3 = parseFloat(prompt("Digite o terceiro número: "));
    let media = (n1 + n2 + n3) / 3;
    document.getElementById("saidaMedia").textContent = "A média é: " + media;
  }
  
  function verificarMaioridade() {
    let idade = parseInt(prompt("Digite sua idade: "));
    let resultado = idade >= 18 ? "Você é maior de idade." : "Você é menor de idade.";
    document.getElementById("saidaMaioridade").textContent = resultado;
  }
  
  function contagemRegressiva() {
    let resultado = "";
    for (let i = 10; i >= 1; i--) {
      resultado += i + " ";
    }
    document.getElementById("saidaContagem").textContent = "Contagem regressiva: " + resultado;
  }
  