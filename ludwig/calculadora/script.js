function calcularIMC() {
    // Solicita os dados do usuário
    let peso = parseFloat(prompt("Informe seu peso (em kg):"));
    let altura = parseFloat(prompt("Informe sua altura (em metros):"));
  
    // Verifica se os dados são válidos
    if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
      alert("Por favor, insira valores válidos para peso e altura.");
      return;
    }
  
    // Calcula o IMC
    let imc = peso / (altura * altura);
    let classificacao = "";
  
    // Classifica o resultado conforme a OMS
    if (imc < 18.5) {
      classificacao = "Abaixo do peso";
    } else if (imc < 25) {
      classificacao = "Peso normal";
    } else if (imc < 30) {
      classificacao = "Sobrepeso";
    } else if (imc < 35) {
      classificacao = "Obesidade grau 1";
    } else if (imc < 40) {
      classificacao = "Obesidade grau 2";
    } else {
      classificacao = "Obesidade grau 3 (mórbida)";
    }
  
    // Mostra o resultado
    alert("Seu IMC é: " + imc.toFixed(2) + "\nClassificação: " + classificacao);
  }
  
  // Executa a função assim que a página carregar
  window.onload = calcularIMC;
  