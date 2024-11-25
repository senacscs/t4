function calcular() {
    // Pega o valor do input
    const valor = parseInt(document.getElementById("valor").value);

    // Verifica se o valor é um número válido
    if (isNaN(valor)) {
      document.getElementById("resultado").innerText = "Por favor, digite um valor numérico válido.";
      return;
    }

    // Calcula a metade inteira e o resto
    const metadeInteira = Math.floor(valor / 2); // Metade inteira
    const resto = valor % 3; // Resto da divisão por 3

    // Exibe os resultados
    document.getElementById("resultado").innerHTML = `
      <p>A metade inteira do número é: ${metadeInteira}</p>
      <p>O resto (mod) da divisão por 3 é: ${resto}</p>
    `;
  }