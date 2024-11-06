function calcular() {
    let resultado;
  
    // Neste exemplo, a multiplicação será executada primeiro
    resultado = 5.0 + 4.0 * 2.0;
    console.log("Operação: 5 + 4 * 2 = ", resultado);
  
    // Neste exemplo, a soma será executada primeiro
    resultado = (5.0 + 4.0) * 2.0;
    console.log("\nOperação: (5 + 4) * 2 = ", resultado);
  
    // Neste exemplo, a divisão será executada primeiro, seguida da multiplicação, e por último a soma
    resultado = 1.0 + 2.0 / 3.0 * 4.0;
    console.log("\nOperação: 1 + 2 / 3 * 4 = ", resultado);
  
    // Neste exemplo, a soma será executada primeiro, seguida da multiplicação, e por último a divisão
    resultado = (1.0 + 2.0) / (3.0 * 4.0);
    console.log("\nOperação: (1 + 2) / (3 * 4) = ", resultado, "\n");
  }
  
  calcular();