function calcular() {
    // Pega o valor do input
    const valor = parseFloat(document.getElementById("valor").value);

    // Verifica se o valor é um número válido
    if (isNaN(valor)) {
      document.getElementById("resultado").innerText = "Por favor, digite um valor numérico válido.";
      return;
    }

    // Calcula a potência ao cubo e a raiz quadrada
    const potencia = Math.pow(valor, 3); // Eleva ao cubo
    const raizQuadrada = Math.sqrt(valor); // Calcula a raiz quadrada

    // Exibe os resultados
    document.getElementById("resultado").innerHTML = `
      <p>O número ao cubo é: ${potencia.toFixed(2)}</p>
      <p>A raiz quadrada do número é: ${raizQuadrada.toFixed(2)}</p>
    `;
  }