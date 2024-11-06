function calcular() {
    // Lê o valor digitado pelo usuário
    let valor = parseInt(prompt("Digite um valor:"));
  
    // Calcula a metade inteira e o resto da divisão
    let metadeInteira = Math.floor(valor / 2);
    let resto = valor % 3;
  
    // Exibe os resultados
    console.log("A metade inteira do número é:", metadeInteira);
    console.log("O resto (mod) da divisão por 3 é:", resto);
  }
  
  calcular();