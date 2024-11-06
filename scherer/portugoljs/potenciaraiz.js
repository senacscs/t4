

JavaScript
function calcular() {
  // Lê o valor digitado pelo usuário
  let valor = parseFloat(prompt("Digite um valor:"));

  // Calcula a potência e a raiz quadrada
  let potencia = Math.pow(valor, 3);
  let raizQuadrada = Math.sqrt(valor);

  // Exibe os resultados
  console.log("O número ao cubo é:", potencia);
  console.log("A raiz quadrada do número é:", raizQuadrada);
}

calcular();