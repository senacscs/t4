function calcular() {
    // Obtém os valores dos inputs
    let num1 = parseFloat(document.getElementById("num1").value);
    let num2 = parseFloat(document.getElementById("num2").value);
  
    // Realiza as operações
    let soma = num1 + num2;
    let sub = num1 - num2;
    let mult = num1 * num2;
    let div = num2 !== 0 ? num1 / num2 : "Divisão por zero não é permitida"; // Verifica divisão por zero
  
    // Exibe os resultados no HTML
    document.getElementById("soma").textContent = "A soma dos números é igual a: " + soma;
    document.getElementById("subtracao").textContent = "A subtração dos números é igual a: " + sub;
    document.getElementById("multiplicacao").textContent = "A multiplicação dos números é igual a: " + mult;
    document.getElementById("divisao").textContent = "A divisão dos números é igual a: " + div;
  
    // Exibe um alerta com os resultados
    alert("Resultados:\n" +
          "Soma: " + soma + "\n" +
          "Subtração: " + sub + "\n" +
          "Multiplicação: " + mult + "\n" +
          "Divisão: " + div);
  }
  