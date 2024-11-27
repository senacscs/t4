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
  
  // Novos exemplos de Desvios Condicionais
  
  function maioridadeComMsg() {
    let idade = parseInt(prompt("Digite sua idade: "));
    let resultado;
    
    if (idade >= 18) {
      resultado = "Você é maior de idade e pode acessar conteúdos restritos.";
    } else {
      resultado = "Você é menor de idade. Acesso restrito.";
    }
  
    document.getElementById("saidaMaioridadeMsg").textContent = resultado;
  }
  
  function anoBissexto() {
    let ano = parseInt(prompt("Digite um ano para verificar se é bissexto: "));
    let resultado;
  
    if ((ano % 4 === 0 && ano % 100 !== 0) || (ano % 400 === 0)) {
      resultado = ano + " é um ano bissexto.";
    } else {
      resultado = ano + " não é um ano bissexto.";
    }
  
    document.getElementById("saidaAnoBissexto").textContent = resultado;
  }
  